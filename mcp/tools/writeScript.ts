import fs from 'fs'

const JSON_FILE_PATH = '/home/viktor/code/vizual/server/data/text/text.json'

export const writeScript = async (text: string, node: string | undefined) => {
  let data: Array<{text: string, node: string | undefined}> = []
  
  if (fs.existsSync(JSON_FILE_PATH)) {
    const fileContent = fs.readFileSync(JSON_FILE_PATH, 'utf-8')
    data = JSON.parse(fileContent)
  }
  
  data.push({ text, node })
  
  fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8')
}