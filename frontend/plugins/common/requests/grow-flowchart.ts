export const growFlowchart = async (data: any, languageModel: string) => {
  const response = await fetch('http://localhost:8/grow-flowchart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { ...data, languageModel } }),
  })
  const result = await response.json()
  const { explanation, nodes } = result.data
  return { explanation, nodes }
}


