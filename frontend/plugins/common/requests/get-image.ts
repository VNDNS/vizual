export const getImage = async (directoryKey: string, imageName: string) => {
  const response = await fetch('http://localhost:3009/get-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ directoryKey, imageName }),
  })
  const result = await response.json()
  return result.image
}


