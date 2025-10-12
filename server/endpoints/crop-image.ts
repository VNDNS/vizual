import express from 'express'
import sharp from "sharp";
import { padImage } from './pad-image';
import { openai } from 'server/openai/openai';
import { toFile } from 'openai';
import fs from 'fs';


export const generateImage = async (input: string, imageBase64: string, fileName: string, model?: string) => {
  console.log('generating image...')
  const image_bytes = Buffer.from(imageBase64, 'base64');
  const tempPath = `./server/images/tmp/${fileName}`;
  fs.writeFileSync(tempPath, image_bytes);
  const image = await toFile(fs.createReadStream(tempPath), null, {type: 'image/png'});
  const result = await openai.images.edit({
    prompt: input,
    model: model || "gpt-image-1",
    size: "1024x1024",
    quality: "high",
    image: image,
    background: "transparent",
    input_fidelity: "high",
  })
  if(result?.data?.[0]?.b64_json){
    const image_base64 = result.data[0].b64_json;
    const image_bytes = Buffer.from(image_base64, "base64");
    fs.writeFileSync(`./server/images/output/${fileName}.png`, image_bytes);
    fs.writeFileSync(`./motion-canvas/images/${fileName}.png`, image_bytes);
  }
  fs.unlinkSync(tempPath);
  console.log('done')
  // return `data:image/png;base64,${result?.data?.[0]?.b64_json}`
  return `${result?.data?.[0]?.b64_json}`
}

const cropImage = async (url: string, p1: { x: number; y: number }, p2: { x: number; y: number }) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const metadata = await sharp(buffer).metadata();
  if (!metadata.width || !metadata.height) throw new Error('Unable to get image dimensions');
  const left = Math.round(p1.x * metadata.width / 100);
  const top = Math.round(p1.y * metadata.width / 100);
  const width = Math.round((p2.x - p1.x) * metadata.width / 100);
  const height = Math.round((p2.y - p1.y) * metadata.width / 100);
  const croppedBuffer = await sharp(buffer)
    .extract({
      left,
      top,
      width,
      height,
    })
    .toBuffer();
  return croppedBuffer.toString('base64');
}

const cropImageRouter = express.Router()

cropImageRouter.post('/crop-image', async (req, res) => {
  const { image, p1, p2, prompt, name } = req.body
  try {
    const croppedImage_ = await cropImage(image, p1, p2)
    const croppedImage = await padImage(croppedImage_)
    const generatedImage = await generateImage(prompt, croppedImage, name)
    res.json({ success: true, generatedImage })
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message })
  }
})

export { cropImageRouter }


