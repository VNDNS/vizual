import express from 'express'
import path from 'path'
import fs from 'fs'
import { extractSnapshots, SNAPSHOT_INTERVAL } from '../video-analysis/snapshot'
import { analyzeVideo } from '../video-analysis/analyze'
import { dataPath } from '../constants'
import { getSchema, getSchemaNames } from '../video-analysis/schemas'

const processVideoRouter = express.Router()

interface ProcessVideoRequest {
  videoName: string
  schemaName?: string
  contextWindow?: number
  snapshotInterval?: number
  model?: string
}

processVideoRouter.post('/process-video', async (req, res) => {
  console.log('Processing video...')

  try {
    const {videoName, schemaName = 'analysis', contextWindow = 3, snapshotInterval = SNAPSHOT_INTERVAL} = req.body as ProcessVideoRequest

    if (!videoName) {
      return res.status(400).json({ 
        success: false, 
        error: 'videoName is required' 
      })
    }

    const schemaConfig = getSchema(schemaName)
    if (!schemaConfig) {
      return res.status(400).json({ 
        success: false, 
        error: `Unknown schema: ${schemaName}. Available schemas: ${getSchemaNames().join(', ')}` 
      })
    }

    const { schema, prompt } = schemaConfig

    const videoPath = path.join(dataPath('videos'), videoName)
    
    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({ 
        success: false, 
        error: `Video not found: ${videoName}` 
      })
    }

    console.log('=== Starting Video Analysis ===')
    console.log(`Video: ${videoName}`)
    console.log(`Context Window: ${contextWindow} snapshots`)
    console.log(`Snapshot Interval: ${snapshotInterval} seconds`)
    console.log('================================\n')

    const videoBaseName = path.basename(videoPath, path.extname(videoPath))
    const snapshotDir = path.join(process.cwd(), 'server/video-analysis/snapshots', videoBaseName)
    
    let snapshotPaths: string[] = []
    
    if (fs.existsSync(snapshotDir) && fs.readdirSync(snapshotDir).length > 0) {
      console.log('Snapshots already exist, reusing them...')
      snapshotPaths = fs.readdirSync(snapshotDir)
        .filter(f => f.endsWith('.png'))
        .sort((a, b) => {
          const numA = parseInt(a.match(/\d+/)?.[0] || '0')
          const numB = parseInt(b.match(/\d+/)?.[0] || '0')
          return numA - numB
        })
        .map(f => path.join(snapshotDir, f))
    } else {
      snapshotPaths = await extractSnapshots(videoPath, snapshotInterval)
    }
    
    console.log(`Found ${snapshotPaths.length} snapshots\n`)

    const outputFile = path.join(
      process.cwd(),
      'server/data/video-analysis',
      `${videoBaseName}.json`
    )

    const results = await analyzeVideo({
      prompt,
      schema,
      snapshotPaths,
      contextWindow,
      outputFile
    })

    console.log('\n=== Analysis Complete ===')
    console.log(`Total snapshots analyzed: ${results.length}`)
    console.log(`Results saved to: ${outputFile}`)
    console.log('=========================')

    res.json({ 
      success: true, 
      results,
      outputFile,
      snapshotCount: snapshotPaths.length
    })

  } catch (error: any) {
    console.error('Error processing video:', error)
    res.status(500).json({ 
      success: false, 
      error: String(error?.message || error) 
    })
  }
})

processVideoRouter.get('/video-schemas', (_req, res) => {
  const schemaNames = getSchemaNames()
  res.json({ 
    success: true, 
    schemas: schemaNames 
  })
})

processVideoRouter.get('/video-analysis/:videoName', (req, res) => {
  try {
    const { videoName } = req.params
    
    if (!videoName) {
      return res.status(400).json({ 
        success: false, 
        error: 'videoName is required' 
      })
    }

    const videoBaseName = path.basename(videoName, path.extname(videoName))
    const analysisFile = path.join(
      process.cwd(),
      'server/data/video-analysis',
      `${videoBaseName}.json`
    )

    if (!fs.existsSync(analysisFile)) {
      return res.status(404).json({ 
        success: false, 
        error: 'Analysis not found for this video' 
      })
    }

    const analysisData = JSON.parse(fs.readFileSync(analysisFile, 'utf-8'))
    
    res.json({ 
      success: true, 
      data: analysisData 
    })

  } catch (error: any) {
    console.error('Error fetching video analysis:', error)
    res.status(500).json({ 
      success: false, 
      error: String(error?.message || error) 
    })
  }
})

export { processVideoRouter }

