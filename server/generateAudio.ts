import fs from 'fs'
import { getSpeech } from './openai/speech'
const JSON_FILE_PATH = '/home/viktor/code/vizual/server/data/text/text.json'

const generateAudio = async () => {

  console.log('Generating audio...')
  
  const textArray = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf-8'))

  for(let i = 0; i < textArray.length; i++) {
    const entry = textArray[i]
    const path = `./server/audio/${entry.node}.wav`
    if(fs.existsSync(path)) {
      continue
    }
    await getSpeech(entry.text, path)
    textArray[i].audio = path
  }
  fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(textArray, null, 2))
  console.log('Finished generating audio.')
}

generateAudio()