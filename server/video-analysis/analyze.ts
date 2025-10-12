import { openai } from '../openai/openai'
import fs from 'fs'
import path from 'path'

interface AnalysisConfig {
  prompt: string
  schema: any
  snapshotPaths: string[]
  contextWindow: number
  outputFile: string
  model?: string
  snapshotInterval: number
}

interface AnalysisState {
  lastProcessedIndex: number
  results: any[]
}

const loadState = (outputFile: string): AnalysisState => {
  if (fs.existsSync(outputFile)) {
    const data = fs.readFileSync(outputFile, 'utf-8')
    try {
      const parsed = JSON.parse(data)
      return {
        lastProcessedIndex: parsed.lastProcessedIndex || -1,
        results: parsed.results || []
      }
    } catch {
      return { lastProcessedIndex: -1, results: [] }
    }
  }
  return { lastProcessedIndex: -1, results: [] }
}

const saveState = (outputFile: string, state: AnalysisState) => {
  const outputDir = path.dirname(outputFile)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  fs.writeFileSync(outputFile, JSON.stringify(state, null, 2))
}

const encodeImage = (imagePath: string): string => {
  const imageBuffer = fs.readFileSync(imagePath)
  return imageBuffer.toString('base64')
}

export const analyzeVideo = async (config: AnalysisConfig): Promise<any[]> => {
  const { prompt, schema, snapshotPaths, contextWindow, outputFile, snapshotInterval } = config
  
  const state = loadState(outputFile)
  console.log(`Starting analysis from snapshot ${state.lastProcessedIndex + 1}/${snapshotPaths.length}`)

  for (let i = state.lastProcessedIndex + 1; i < snapshotPaths.length; i++) {
    const snapshotPath = snapshotPaths[i]
    console.log(`Processing snapshot ${i + 1}/${snapshotPaths.length}: ${snapshotPath}`)

    const contextStart = Math.max(0, i - contextWindow)
    const contextResults = state.results.slice(contextStart, i)

    const contextText = contextResults.length > 0 
      ? `\n\nPrevious snapshot analysis results for context:\n${JSON.stringify(contextResults, null, 2)}`
      : ''

    const base64Image = encodeImage(snapshotPath)

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4.1',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt + contextText },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/png;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        response_format: schema
      })

      const result = completion.choices[0].message.content
      const parsedResult = JSON.parse(result || '{}')
      
      parsedResult.snapshotIndex = i
      parsedResult.snapshotPath = snapshotPath
      parsedResult.time = i * snapshotInterval

      state.results.push(parsedResult)
      state.lastProcessedIndex = i

      saveState(outputFile, state)
      
      console.log(`Snapshot ${i + 1} analyzed:`, parsedResult)
    } catch (error) {
      console.error(`Error analyzing snapshot ${i + 1}:`, error)
      throw error
    }
  }

  console.log(`Analysis complete! Results saved to ${outputFile}`)
  return state.results
}

