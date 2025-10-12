import express from 'express'
import fs from 'fs'
import { paths } from '../constants'

const getImageRouter = express.Router()

getImageRouter.post('/get-image', (req, res) => {

  const { directoryKey, imageName } = req.body

  let path = ''
  if (directoryKey === 'input') {
    path = paths.inputImages
  } else if(directoryKey === 'output') {
    path = paths.outputImages
  } else if(directoryKey === 'padded') {
    path = paths.paddedImages
  }

  const filePath = `${path}/${imageName}`
  let image = ''
  if (fs.existsSync(filePath)) {
    const imageString = fs.readFileSync(filePath).toString('base64')
    image = `data:image/png;base64,${imageString}`
  }

  res.json({ image })
})

export { getImageRouter }