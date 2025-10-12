export const generateNodes = async (node: any, requestedChild: string, flowChartDescription: string, nodeDescription: string) => {
  const result = await fetch('http://localhost:3009/generate-nodes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: node,
      requestedChild,
      flowChartDescription,
      nodeDescription,
    }),
  })

  return (await result.json()).data
}
