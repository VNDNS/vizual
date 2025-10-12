import { getSpeech } from "./openai/speech";

await getSpeech('Hello world! This is a test.', './audio/speech.wav')