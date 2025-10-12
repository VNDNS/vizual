export const generateImage = async (prompt: string, imageBase64: string, fileName: string) => {
  console.log('generating image...')
  const response = await fetch('http://localhost:3009/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, imageBase64, fileName }),
  })
  const json = await response.json()
  return json.outputImageBase64
}


