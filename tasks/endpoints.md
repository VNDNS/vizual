Your task is to implement an endpoint, integrate it into the 
application and write a function that makes a request to that endpoint.

The request file as well as the endpoint file have the same name, but different locations.

endpoint name: generate-image
endpoint description: receives an object called data and just logs it for now.


requests directory: ./frontend/plugins/common/requests
endpoints directory: .server/endpoints
initialize endpoint in .server/index.ts

---

example for a request file:

./frontend/plugins/common/requests/get-json.ts

export const getJson = async (data: string) => {
  
  const response = await fetch('http://localhost:3009/get-json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data,
    }),
  })
  const json = await response.json()
  return json
}

---

example for an endpoint file:

./server/endpoints/get-json.ts

import express from 'express'
import { readJson } from 'server/functions/readJson'

const getJsonRouter = express.Router()

getJsonRouter.post('/get-json', (req, res) => {
  const { data } = req.body
  const jsonData = readJson(data)
  res.json(jsonData)
})

export { getJsonRouter }



