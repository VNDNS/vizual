import express from 'express'
import fs from 'fs'
import { dataPath, paths } from '../constants'
const getDirectoryRouter = express.Router()

const plotTypes = ['barChart', 'container', 'linePlot', 'pieChart', 'radarCharts', 'dynamicBarChart', 'timeLine', 'largeNumber', 'flowChart', 'panel', 'background']

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
  } else if (plotTypes.includes(fileType)) {
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
  }

  const files = fs.readdirSync(path)
  res.json({ success: true, files })
})

export { getDirectoryRouter }