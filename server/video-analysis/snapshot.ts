import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import fs from 'fs'
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'
import { promisify } from 'util'

ffmpeg.setFfmpegPath(ffmpegInstaller.path)

export const SNAPSHOT_INTERVAL = 5

const getVideoDuration = (videoPath: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) reject(err)
      else resolve(metadata.format.duration || 0)
    })
  })
}

const extractSingleSnapshot = (videoPath: string, timestamp: number, outputPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .seekInput(timestamp)
      .frames(1)
      .output(outputPath)
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .run()
  })
}

export const extractSnapshots = async (videoPath: string, interval: number = SNAPSHOT_INTERVAL): Promise<string[]> => {
  const snapshotDir = path.join(process.cwd(), 'server/video-analysis/snapshots')
  const videoName = path.basename(videoPath, path.extname(videoPath))
  const videoSnapshotDir = path.join(snapshotDir, videoName)

  if (!fs.existsSync(videoSnapshotDir)) {
    fs.mkdirSync(videoSnapshotDir, { recursive: true })
  }

  console.log(`Getting video duration...`)
  const duration = await getVideoDuration(videoPath)
  console.log(`Video duration: ${Math.floor(duration)} seconds`)

  const timestamps: number[] = []
  for (let t = 0; t < duration; t += interval) {
    timestamps.push(t)
  }

  console.log(`Extracting ${timestamps.length} snapshots every ${interval} seconds...`)

  const snapshots: string[] = []

  for (let i = 0; i < timestamps.length; i++) {
    const timestamp = timestamps[i]
    const outputPath = path.join(videoSnapshotDir, `snapshot_${String(i + 1).padStart(4, '0')}.png`)
    
    if (fs.existsSync(outputPath)) {
      console.log(`Snapshot ${i + 1}/${timestamps.length} already exists, skipping`)
      snapshots.push(outputPath)
      continue
    }

    process.stdout.write(`\rExtracting snapshot ${i + 1}/${timestamps.length} at ${Math.floor(timestamp)}s...`)
    
    try {
      await extractSingleSnapshot(videoPath, timestamp, outputPath)
      snapshots.push(outputPath)
    } catch (err) {
      console.error(`\nError extracting snapshot at ${timestamp}s:`, err)
    }
  }

  console.log(`\nExtracted ${snapshots.length} snapshots to ${videoSnapshotDir}`)
  return snapshots
}
