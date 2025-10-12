import { openai } from "./openai"
import { toFile } from "openai"
import fs from "fs"

export const generateImage = async (input: string, imagePath: string, fileName: string, model?: string) => {
  console.log('generating image...')


  const image = await toFile(fs.createReadStream(imagePath), null, {type: 'image/png'})
  
  const result = await openai.images.edit({
    prompt: input,
    model: model || "gpt-image-1",
    size: "1024x1024",
    quality: "low",
    image: image,
    background: "transparent",
    input_fidelity: "low",
  })

  if(result?.data?.[0]?.b64_json){
    const image_base64 = result.data[0].b64_json;
    const image_bytes = Buffer.from(image_base64, "base64");
    fs.writeFileSync(`./server/images/output/${fileName}`, image_bytes);
  }

  console.log('done')

  return `data:image/png;base64,${result?.data?.[0]?.b64_json}`
}