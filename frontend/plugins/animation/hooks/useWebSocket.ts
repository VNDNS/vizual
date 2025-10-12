import { useAnimation } from '@context/context'
import { useEffect } from 'react'
import { useComputeEdges } from './useComputeEdges'
import { Message } from './websocketHandlers/types'
import { handleMessage } from './websocketHandlers/handleMessage'

export const useWebSocket = () => {
  const { components, setComponents, setFrame, setAnimation } = useAnimation()
  const context = useAnimation()
  const { computeEdges } = useComputeEdges()

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000')

    ws.onmessage = async event => {
      try {
        const message: Message = JSON.parse(event.data)
        await handleMessage(message, context)
      } catch {
        console.error('Error parsing data:', event.data)
      }
    }

    return () => ws.close()
  }, [components, computeEdges, setAnimation, setComponents, setFrame])
}
          