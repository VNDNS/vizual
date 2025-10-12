import fs from 'fs'

export const readImages = () => {
  const fileContent = fs.readFileSync(`/home/viktor/code/vizual/server/data/images/images.json`, 'utf-8')
  return fileContent
}