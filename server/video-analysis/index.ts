import { downloadVideo } from './download'
import { extractSnapshots, SNAPSHOT_INTERVAL } from './snapshot'
import { analyzeVideo } from './analyze'
import path from 'path'
import fs from 'fs'

interface VideoAnalysisConfig {
  videoUrl: string
  prompt: string
  schema: any
  contextWindow?: number
  snapshotInterval?: number
  model?: string
  schemaName?: string
}

export const runVideoAnalysis = async (config: VideoAnalysisConfig) => {
  const {
    videoUrl,
    prompt,
    schema,
    contextWindow = 3,
    snapshotInterval = SNAPSHOT_INTERVAL,
    model,
    schemaName = 'analysis'
  } = config

  console.log('=== Starting Video Analysis ===')
  console.log(`Video URL: ${videoUrl}`)
  console.log(`Context Window: ${contextWindow} snapshots`)
  console.log(`Snapshot Interval: ${snapshotInterval} seconds`)
  console.log('================================\n')

  const videoPath = await downloadVideo(videoUrl)
  console.log(`Video downloaded: ${videoPath}\n`)

  const videoName = path.basename(videoPath, path.extname(videoPath))
  const snapshotDir = path.join(process.cwd(), 'server/video-analysis/snapshots', videoName)
  
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
    `${videoName}_${schemaName}.json`
  )

  const results = await analyzeVideo({
    prompt,
    schema,
    snapshotPaths,
    contextWindow,
    outputFile,
    model,
    snapshotInterval
  })

  console.log('\n=== Analysis Complete ===')
  console.log(`Total snapshots analyzed: ${results.length}`)
  console.log(`Results saved to: ${outputFile}`)
  console.log('=========================')

  return results
}

