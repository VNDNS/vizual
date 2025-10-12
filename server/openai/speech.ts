import fs from "fs"
import { openai } from "./openai";

export const getSpeech = async (text: string, file: string) => {
  console.log(`request text to speech: ${file}`)
  const audio = await openai.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "nova",
    input: text,
    response_format: "wav"
  });
  const buffer = Buffer.from(await audio.arrayBuffer());
  await fs.promises.writeFile(file, buffer);
}