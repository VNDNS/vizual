import express from 'express'
import { array, object, string } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { chat } from '../openai/chat';

const schema_ = object({node: object({
  text: string().describe('The text of the node.'),
  suggestedChildren: array(string()).describe('The names of the suggested children of the node. Each name should be short and concise.'),
})})

export const schema = zodResponseFormat(schema_, "schema")

const generateNodesRouter = express.Router()

generateNodesRouter.post('/generate-nodes', async (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'No data received' });
  } else {

    const data = req.body.data
    const name = data.name
    const text = data.text
    const requestedChild = req.body.requestedChild
    const flowChartDescription = req.body.flowChartDescription
    const nodeDescription = req.body.nodeDescription
    
    const input = `
    You are a helpful assistant that generates nodes for a flow chart.
    ${flowChartDescription}.
    The flow chart is a tree, with the root node being the first node.
    You are now given the content of a node of that flow chart and your task is to generate the content for the requested child,
    as well as three suggestions for the children of the node that you are describing.
    ${nodeDescription}.
    
    Keep the name for each node short and concise.
    The node has the following name: ${name}
    
    and the following text: ${text}.

    The requested child is: ${requestedChild}
    `
    try {
      console.log('generating nodes...')
      const result = await chat(input, schema);
      res.json({ success: true, data: result });
    } catch (error) {
      console.error('Error processing data:', error);
      res.status(500).json({ error: 'Failed to process data' });
    }
  }
})

export { generateNodesRouter }