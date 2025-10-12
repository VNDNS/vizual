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

const generateSectionRouter = express.Router()

generateSectionRouter.post('/generate-section', async (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'No data received' });
  } else {

    const tableOfContents = formatTableOfContents(req.body.tableOfContents)
    const sectionIndex = req.body.sectionIndex
    const section = JSON.stringify(req.body.tableOfContents[sectionIndex])
    const summary = req.body.summary
    const languageModel = req.body.languageModel

    const element = req.body.tableOfContents[sectionIndex]
    const isSection = element.subSection === 0 && element.subSubSection === 0
    const isSubSection = element.subSection !== 0 && element.subSubSection === 0

    
    const input = `
    You are a helpful assistant that generates a section for a book.
    Here is the summary of the book: ${summary}.

    Here is the table of contents:
    ${tableOfContents}.

    ${isSection ? 'This is a section. You task is to generate an introduction for the section.' : isSubSection ? 'This is a subsection. You task is to generate an introduction for the subsection.' : 'This is a subsubsection. You task is to generate content for the subsubsection.'}

    This is the section that you are generating:
    
    ${section}.
    
    Now generate the section.
    `
    
    try {
      console.log('generating section...')
      const result = await chat(input, null, languageModel);
      saveJson(result, 'section.json')
      fs.writeFileSync('section.md', result)
      console.log('done')
      res.json({ success: true, data: result });
    } catch (error) {
      console.error('Error processing data:', error);
      res.status(500).json({ error: 'Failed to process data' });
    }
  }
})

export { generateSectionRouter }