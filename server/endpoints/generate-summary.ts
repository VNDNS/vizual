import express from 'express'
import { array, object, string, number } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { chat } from '../openai/chat';
import { saveJson } from 'server/functions/saveJson';
import fs from 'fs';
import { formatTableOfContents } from 'server/functions/formatTableOfContents';

const schema_ = object({tableOfContents: array(object({
  section: number().describe('The section number.'),
  subSection: number().describe('The sub section number.'),
  subSubSection: number().describe('The sub sub section number.'),
  title: string().describe('The title of the section.'),
}))})

export const schema = zodResponseFormat(schema_, "schema")

const generateSummaryRouter = express.Router()

generateSummaryRouter.post('/generate-summary', async (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'No data received' });
  } else {

    const data = req.body.data
    const tableOfContents = formatTableOfContents(data)
    const languageModel = req.body.languageModel

    
    const input = `
    You are a helpful assistant that generates a summary for a hypothetical book.
    The table of contents is as follows: 
    
    ${tableOfContents}.
    
    Generate a summary for the book.
    `
    
    try {
      console.log('generating summary...')
      const result = await chat(input, null, languageModel);
      saveJson(result, 'summary.json')
      fs.writeFileSync('summary.md', result)
      console.log('done')
      res.json({ success: true, data: result });
    } catch (error) {
      console.error('Error processing data:', error);
      res.status(500).json({ error: 'Failed to process data' });
    }
  }
})

export { generateSummaryRouter }