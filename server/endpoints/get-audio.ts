import express from 'express'
import fs from 'fs'
import { paths } from '../constants'
const getAudioRouter = express.Router()

/*
This endpoint reads the audio files inside the server/audio directory and returns
an array of objects with the audio file name and the duration of the audio file.
*/


getAudioRouter.post('/get-audio', (_req, res) => {

  console.log('Load audio...')

  const audioDir = `${paths.server}/audio`
  const fileNames = fs.readdirSync(audioDir)


  const results = fileNames.map(name => {
    const fullPath = `${audioDir}/${name}`
    let duration: number | null = null

    try {
      const buffer = fs.readFileSync(fullPath)

      const riffHeader = buffer.toString('ascii', 0, 4)
      const waveHeader = buffer.toString('ascii', 8, 12)

      if (riffHeader === 'RIFF' && waveHeader === 'WAVE') {
        let offset = 12
        let byteRate = 0
        let dataChunkOffset = 0

        while (offset + 8 <= buffer.length) {
          const chunkId = buffer.toString('ascii', offset, offset + 4)
          const chunkSize = buffer.readUInt32LE(offset + 4)
          const nextOffset = offset + 8 + chunkSize + (chunkSize % 2)

          if (chunkId === 'fmt ') {
            byteRate = buffer.readUInt32LE(offset + 16)
          } else if (chunkId === 'data') {
            dataChunkOffset = offset + 8
            break
          }

          offset = nextOffset
        }

        if (byteRate > 0 && dataChunkOffset > 0) {
          const dataSize = buffer.length - dataChunkOffset
          duration = dataSize / byteRate
        }
        console.log(`${name} duration: ${duration}`)
      }
    } catch (_) {
      duration = null
    }

    return { name, duration }
  })

  res.json(results)
})

export { getAudioRouter }