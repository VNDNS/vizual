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
