import express from 'express'
import { saveJson } from '../functions/saveJson'

const saveJsonRouter = express.Router()

saveJsonRouter.post('/save-json', (req, res) => {

  const { data, path } = req.body
  saveJson(data, path)

  res.json({ success: true })
})

export { saveJsonRouter }