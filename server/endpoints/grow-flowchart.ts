import express from 'express'
import { formatTableOfContents } from 'server/functions/formatTableOfContents'
import { saveJson } from 'server/functions/saveJson'
import { chat } from 'server/openai/chat'
import fs from 'fs'
import { zodResponseFormat } from 'openai/helpers/zod.mjs'
import { array, object, number, string } from 'zod'

const growFlowchartRouter = express.Router()

const schema_ = object({
  explanation: string().describe('Your explanation/thoughts on how the flowchart should look like.'),
  nodes: array(object({
    name: string().describe('The name of the node.'),
    children: array(string()).describe('The names of the children of the node.'),
  })),
})

export const schema = zodResponseFormat(schema_, "schema")

growFlowchartRouter.post('/grow-flowchart', async (req, res) => {
  const { data } = req.body

  const {nodes, name, description, languageModel} = data

  console.log('[grow-flowchart] data:', data)

    
    const input = `
    I want to create a flowchart on the ${name}:
    Here is a description of what the flowchart should depict.
    
    ${description}.

    I want you to think about how an intersting, informative and easy to understand flowchart on given
    topic would look like.

    The following is a representation of the current state of the flowchart.
    Your task is to a) provide some thoughts and b) add some nodes to the existing nodes
    and assign the parent/children relation accordingly.

    ${nodes}
    
    `
    
      console.log('growing flowchart...')
      const result = await chat(input, schema, languageModel);
      console.log('[grow-flowchart] result:', result)
      res.json({ success: true, data: result });
})

export { growFlowchartRouter }


