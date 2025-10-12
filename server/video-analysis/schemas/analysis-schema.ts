import { z } from 'zod'
import { zodResponseFormat } from 'openai/helpers/zod'

export const AnalysisSchema = z.object({
  description: z.string().describe('A description of what is happening in this frame'),
  timestamp: z.number().describe('Timestamp in seconds from the start of the video')
})

export type Analysis = z.infer<typeof AnalysisSchema>

export const analysisSchema = zodResponseFormat(AnalysisSchema, 'video_analysis')

export const analysisPrompt = 'Analyze this video frame and provide a description of what is happening.'

