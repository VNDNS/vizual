export const setScene = async (plugin: string) => {
  await fetch(`http://localhost:3009/set-scene`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ plugin })
  })
}