import { z } from 'zod'
import { zodResponseFormat } from 'openai/helpers/zod'

export const ZeldaProgressSchema = z.object({
  heartContainers: z.number().describe('Number of heart containers the player has'),
  rupees: z.number().describe('Number of rupees the player has'),
  currentLocation: z.string().describe('Current location or area in the game'),
  questProgress: z.string().describe('Description of current quest or objective'),
})

export type ZeldaProgress = z.infer<typeof ZeldaProgressSchema>

export const zeldaSchema = zodResponseFormat(ZeldaProgressSchema, 'zelda_progress')

export const zeldaPrompt = `You are analyzing a Legend of Zelda gameplay video. 
Based on the provided screenshot, identify and extract the following information:
- Number of heart containers visible in the UI
- Number of rupees visible in the UI
- Current location or area name
- Current quest or objective

Use the previous snapshots as context to understand the progression.`

