import express from 'express'
import fs from 'fs'
import { dataPath } from '../constants'

const getDataDirectoryRouter = express.Router()

getDataDirectoryRouter.post('/get-data-directory', (req, res) => {
  const { dataType } = req.body
  const path = dataPath(dataType)
  const files = fs.readdirSync(path)

  res.json({ files })
})

export { getDataDirectoryRouter }