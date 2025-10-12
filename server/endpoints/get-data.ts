import express from 'express'
import fs from 'fs'

const getDataRouter = express.Router()

getDataRouter.post('/get-data', (req, res) => {

  const { dataType, fileName } = req.body
  const path = `./data/${dataType}/${fileName}.json`
  const data = JSON.parse(fs.readFileSync(path, 'utf8'))

  res.json({ data })
})

export { getDataRouter }