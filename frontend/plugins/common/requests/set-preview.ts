export const setPreview = async (plugin: string, data: any) => {
  await fetch(`http://localhost:3009/set-preview`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ plugin, data })
  })
}