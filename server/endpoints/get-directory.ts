import express from 'express'
import fs from 'fs'
import { dataPath, paths } from '../constants'
import { componentTypes } from '@context/maps/componentTypes'
const getDirectoryRouter = express.Router()

getDirectoryRouter.post('/get-directory', (req, res) => {
  const { data: fileType } = req.body

  let path = ''
  if (fileType === 'plot') {
    path = paths.plots

  } else if (fileType === 'latex') {
    path = paths.latex
  } else if (fileType === 'animation') {
    path = paths.animations
  } else if (fileType === 'shape-configs') {
    path = paths.shapeConfigs
  } else if (componentTypes.includes(fileType)) {
    path = dataPath(fileType)
  } else if (fileType === 'input-images') {
    path = paths.inputImages
  } else if (fileType === 'padded-images') {
    path = paths.paddedImages
  } else if (fileType === 'output-images') {
    path = paths.outputImages
  } else if (fileType === 'node-image') {
    path = paths.outputImages
  } else if (fileType === 'arrangement1') {
    path = paths.dataPath('arrangement1')
  } else if (fileType === 'videos') {
    path = paths.dataPath('videos')
  } else if (fileType === 'video-analysis') {
    path = dataPath('video-analysis')
  } else if (fileType === 'panel') {
    path = dataPath('panel')
  }

  console.log('path', path, 'fileType', fileType)

  const files = fs.readdirSync(path)
  res.json({ success: true, files })
})

export { getDirectoryRouter }