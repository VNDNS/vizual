import express from 'express'
import { previewFile } from 'server/constants'
import { generateScene } from 'server/functions/generateScene'
import { saveJson } from 'server/functions/saveJson'

const setPreviewRouter = express.Router()

setPreviewRouter.post('/set-preview', (req, res) => {

  const { plugin, data } = req.body
  if (!!plugin && !!data && plugin !== 'animation') {
    //saveJson(data, previewFile(plugin))
  }
  if ( plugin === 'animation' || plugin === 'arrangement' ) {
    saveJson(data, previewFile('animation'))
    generateScene(data)
  }
  res.json({ success: true })
})

export { setPreviewRouter }