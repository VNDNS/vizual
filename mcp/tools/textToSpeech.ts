import { getSpeech } from 'server/openai/speech'

export const textToSpeech = async (text: string) => {
  await getSpeech(text, `./audio/speech.wav`)
}