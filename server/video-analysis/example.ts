import { runVideoAnalysis } from './index'
import { zeldaSchema, zeldaPrompt } from './schemas/zelda-schema'

const analyzeZeldaVideo = async () => {
  const videoUrl = 'https://www.youtube.com/watch?v=xf2IO7P5DVA'
  
  await runVideoAnalysis({
    videoUrl,
    prompt: zeldaPrompt,
    schema: zeldaSchema,
    contextWindow: 3,
    snapshotInterval: 600,
    model: 'gpt-4.1',
    schemaName: 'zelda'
  })
}

analyzeZeldaVideo().catch(console.error)

