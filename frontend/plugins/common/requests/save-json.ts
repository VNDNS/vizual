export const saveJson = async (data: any, path: string) => {
  await fetch(`http://localhost:3009/save-json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data, path })
  })
}