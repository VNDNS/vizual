import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '../..')
const JSON_FILE_PATH = path.resolve(root, 'server/data/text/text.json')

export const writeScript = async (text: string, node: string | undefined) => {
  let data: Array<{text: string, node: string | undefined}> = []
  
  if (fs.existsSync(JSON_FILE_PATH)) {
    const fileContent = fs.readFileSync(JSON_FILE_PATH, 'utf-8')
    data = JSON.parse(fileContent)
  }
  
  data.push({ text, node })
  
  fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8')
}