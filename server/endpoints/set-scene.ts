// imports
import express from 'express'

const setSceneRouter = express.Router()

setSceneRouter.post('/set-scene', (req, res) => {
  res.json({ success: true })
})

export { setSceneRouter }


