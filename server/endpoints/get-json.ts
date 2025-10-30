import express from 'express'
import path from 'path'
import { readJson } from 'server/functions/readJson'
import { paths } from '../constants'

const getJsonRouter = express.Router()

getJsonRouter.post('/get-json', (req, res) => {
  const { data } = req.body
  let filePath = data
  if (!path.isAbsolute(data)) {
    filePath = path.resolve(paths.root, data)
  }
  const jsonData = readJson(filePath)
  res.json(jsonData)
})

export { getJsonRouter }