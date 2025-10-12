import express from 'express'
import { readJson } from 'server/functions/readJson'

const getJsonRouter = express.Router()

getJsonRouter.post('/get-json', (req, res) => {
  const { data } = req.body
  const jsonData = readJson(data)
  res.json(jsonData)
})

export { getJsonRouter }