export const getDirectory = async (data: any) => {
  const response = await fetch('http://localhost:3009/get-directory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data,
    }),
  })
  const files = (await response.json()).files
  return files
}