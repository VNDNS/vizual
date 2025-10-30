import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '../..')

export const readImages = () => {
  const filePath = path.resolve(root, 'server/data/images/images.json')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  return fileContent
}