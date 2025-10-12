import express from 'express'
import fs from 'fs'
import path from 'path'
import ffmpeg from 'fluent-ffmpeg'
// @ts-ignore - package provides .path at runtime
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'
// @ts-ignore - package provides .path at runtime
import ffprobeInstaller from '@ffprobe-installer/ffprobe'
import { paths } from '../constants'

const processAudioRouter = express.Router()

/*
This endpoint processes the audio clips and stores one audio file in given location.
That audio file is the concatenation of all the audio clips taking into account the start time of each clip.
clips is an array of object of the following shape:
{
  name: string,
  duration: number,
  start: number,
  id: string
}
*/


processAudioRouter.post('/process-audio', async (req, res) => {

  console.log('Processing audio...')

  try {
    ffmpeg.setFfmpegPath((ffmpegInstaller as any).path)
    ffmpeg.setFfprobePath((ffprobeInstaller as any).path)

    const { clips } = req.body || {}

    if (!Array.isArray(clips)) {
      return res.status(400).json({ success: false, error: 'clips must be an array' })
    }

    const sortedClips = [...clips]
      .filter(c => c && typeof c.name === 'string' && typeof c.start === 'number' && typeof c.duration === 'number')
      .sort((a, b) => a.start - b.start)

    const inputs: Array<{ kind: 'silence', duration: number } | { kind: 'file', filePath: string, duration: number, start: number, name: string }> = []

    let timelinePosition = 0
    const audioDir = `${paths.server}/audio`

    for (const clip of sortedClips) {
      const clipStart = Math.max(0, Number(clip.start) || 0)
      const clipDuration = Math.max(0, Number(clip.duration) || 0)
      const inPath = path.resolve(audioDir, clip.name)

      if (!fs.existsSync(inPath)) {
        continue
      }

      const gap = clipStart - timelinePosition
      if (gap > 0.0005) {
        inputs.push({ kind: 'silence', duration: gap })
        timelinePosition += gap
      }

      inputs.push({ kind: 'file', filePath: inPath, duration: clipDuration, start: clipStart, name: clip.name })
      timelinePosition = clipStart + clipDuration
    }

    if (inputs.length === 0) {
      const outDir = path.resolve(paths.mc, 'audio')
      fs.mkdirSync(outDir, { recursive: true })
      const outPath = path.resolve(outDir, 'audio.wav')

      await new Promise<void>((resolve, reject) => {
        ffmpeg()
          .input('anullsrc=r=44100:cl=stereo')
          .inputOptions(['-f lavfi', '-t 0.1'])
          .audioCodec('pcm_s16le')
          .audioChannels(2)
          .audioFrequency(44100)
          .format('wav')
          .on('error', (err: unknown) => reject(err))
          .on('end', () => resolve())
          .save(outPath)
      })

      return res.json({ success: true, path: outPath, segments: [] })
    }

    const command = ffmpeg()

    for (const segment of inputs) {
      if (segment.kind === 'silence') {
        command.input('anullsrc=r=44100:cl=stereo').inputOptions([`-f lavfi`, `-t ${segment.duration}`])
      } else {
        command.input(segment.filePath)
      }
    }

    const totalInputs = inputs.length
    const concatInputs = Array.from({ length: totalInputs }, (_, i) => `[${i}:a]`).join('')
    const filter = `${concatInputs}concat=n=${totalInputs}:v=0:a=1[a]`

    const outDir = path.resolve(paths.mc, 'audio')
    fs.mkdirSync(outDir, { recursive: true })
    const outPath = path.resolve(outDir, 'audio.wav')

    await new Promise<void>((resolve, reject) => {
      command
        .complexFilter([filter])
        .outputOptions(['-map [a]'])
        .audioCodec('pcm_s16le')
        .audioChannels(2)
        .audioFrequency(44100)
        .format('wav')
        .on('error', (err: unknown) => reject(err))
        .on('end', () => resolve())
        .save(outPath)
    })

    res.json({ success: true, path: outPath, segments: inputs.map(i => i.kind) })
    console.log('Processed audio saved to', outPath)
  } catch (error: any) {
    res.status(500).json({ success: false, error: String(error?.message || error) })
  }
})

export { processAudioRouter }