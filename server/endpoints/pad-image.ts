import express from 'express'
import sharp from "sharp";


export const padImage = async (imageBase64: string) => {
  const background = { r: 255, g: 255, b: 255, alpha: 1 }
  const buffer = Buffer.from(imageBase64, 'base64')
  const metadata = await sharp(buffer).metadata();
  const { width, height } = metadata;
  const size = Math.max(width, height);
  const paddedBuffer = await sharp(buffer)
    .resize(size, size, {
      fit: "contain",
      background,
    })
    .resize(1024, 1024)
    .toBuffer();
  return paddedBuffer.toString('base64');
}


const padImageRouter = express.Router()

padImageRouter.post('/pad-image', async (req, res) => {
  const { image } = req.body
  try {
    const paddedImage = await padImage(image)
    res.json({ success: true, paddedImage })
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message })
  }
})

export { padImageRouter }


