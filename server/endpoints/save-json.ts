import express from 'express'
import path from 'path'
import { saveJson } from '../functions/saveJson'
import { paths } from '../constants'

const saveJsonRouter = express.Router()

saveJsonRouter.post('/save-json', (req, res) => {

  const { data, path: filePath } = req.body
  let resolvedPath = filePath
  if (!path.isAbsolute(filePath)) {
    resolvedPath = path.resolve(paths.root, filePath)
  }
  saveJson(data, resolvedPath)

  res.json({ success: true })
})

export { saveJsonRouter }