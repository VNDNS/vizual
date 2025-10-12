import { openai } from "./openai"

export const chat = async (input: string, schema?: any, model?: string) => {
  console.log('generating with', model)
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: [
      {type: 'text', text: input},
    ] }],
    model: model || "gpt-5-nano",
    response_format: schema,
  })

  const result = completion.choices[0].message.content || ''

  if(schema){
    const parsedResult = JSON.parse(result)
    return parsedResult
  }

  return result
}