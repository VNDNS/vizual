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

const generateTableOfContentsRouter = express.Router()

generateTableOfContentsRouter.post('/generate-table-of-contents', async (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'No data received' });
  } else {

    const data = req.body.data
    const description = data
    const languageModel = req.body.languageModel

    
    const input = `
    You are a helpful assistant that generates a table of contents for a hypothetical book.
    The topic is described as follows: ${description}.
    The table of contents consists of sections, sub sections, and sub sub sections.
    Set subsection and or subsubsection to 0, when you are creating a section, that is not a leaf node.
    example:
    1.0.0 ...
    1.1.0 ...
    1.1.1 ...
    1.1.2 ...
    1.1.3 ...
    1.2.0 ...
    1.3.0 ...

    `

    
    try {
      console.log('generating table of contents...')
      const result = await chat(input, schema, languageModel);
      saveJson(result, 'table-of-contents.json')
      fs.writeFileSync('table-of-contents.md', formatTableOfContents(result.tableOfContents))
      console.log('done')
      res.json({ success: true, data: result });
    } catch (error) {
      console.error('Error processing data:', error);
      res.status(500).json({ error: 'Failed to process data' });
    }
  }
})

export { generateTableOfContentsRouter }