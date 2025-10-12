import youtubedl from 'youtube-dl-exec'
import path from 'path'
import fs from 'fs'

const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  
  return null
}

export const downloadVideo = async (url: string, outputPath?: string): Promise<string> => {
  const videoDir = path.join(process.cwd(), 'server/video-analysis/videos')
  
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true })
  }

  const videoId = extractVideoId(url)
  
  if (videoId && !outputPath) {
    const potentialFile = path.join(videoDir, `${videoId}.mp4`)
    if (fs.existsSync(potentialFile)) {
      console.log(`Video already exists at ${potentialFile}, skipping download`)
      return potentialFile
    }
  }

  const info = await youtubedl(url, {
    dumpSingleJson: true,
    noCheckCertificates: true,
    noWarnings: true,
    preferFreeFormats: true
  })

  const finalVideoId = info.id
  const outputFile = outputPath || path.join(videoDir, `${finalVideoId}.mp4`)

  if (fs.existsSync(outputFile)) {
    console.log(`Video already exists at ${outputFile}, skipping download`)
    return outputFile
  }

  console.log(`Downloading video from ${url}...`)

  await youtubedl(url, {
    output: outputFile,
    format: 'bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[height<=720][ext=mp4]/best[ext=mp4]',
    mergeOutputFormat: 'mp4',
    noCheckCertificates: true,
    noWarnings: true
  })

  console.log(`Video downloaded successfully to ${outputFile}`)
  return outputFile
}
