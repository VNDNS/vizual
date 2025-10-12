import express from 'express'
import fs from "fs"
import { generateImage } from 'server/openai/image'

const generateImageRouter = express.Router()

generateImageRouter.post('/generate-image', async (req, res) => {
  const { prompt, imageBase64, fileName } = req.body
  console.log('generate-image data:', prompt, imageBase64)

  if (imageBase64) {
    const base64Data = imageBase64.replace(/^data:image\/png;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync('image.png', imageBuffer);
  }

  const outputImageBase64 = await generateImage(prompt, 'image.png', fileName)

  res.json({ success: true, outputImageBase64 })
})

export { generateImageRouter }


