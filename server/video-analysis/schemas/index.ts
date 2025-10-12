import { analysisSchema, analysisPrompt } from './analysis-schema'
import { zeldaSchema, zeldaPrompt } from './zelda-schema'

interface SchemaConfig {
  schema: any
  prompt: string
}

export const schemas: Record<string, SchemaConfig> = {
  analysis: {
    schema: analysisSchema,
    prompt: analysisPrompt
  },
  zelda: {
    schema: zeldaSchema,
    prompt: zeldaPrompt
  }
}

export const getSchema = (name: string): SchemaConfig | null => {
  return schemas[name] || null
}

export const getSchemaNames = (): string[] => {
  return Object.keys(schemas)
}

