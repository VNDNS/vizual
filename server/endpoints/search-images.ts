import express from 'express'
import fs from "fs"
import { generateImage } from 'server/openai/image'
import dotenv from 'dotenv'
import axios from 'axios';

dotenv.config();

const searchImagesRouter = express.Router()

searchImagesRouter.post('/search-images', async (req, res) => {
  const { query } = req.body

  console.log('search-images data:', query)

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  const apiKey = process.env.GOOGLE_SEARCH_KEY
  const cx = process.env.GOOGLE_CSE_ID

  try {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: apiKey,
        cx,
        q: query,
        searchType: 'image',
        num: 9,
      },
    });
    console.log(response.data.items)
    res.json(response.data.items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
})

export { searchImagesRouter }


