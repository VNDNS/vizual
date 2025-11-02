import { useAnimation } from '@context/context'
import { useEffect, useRef } from 'react'
import { Message } from './websocketHandlers/types'
import { handleMessage } from './websocketHandlers/handleMessage'

export const useWebSocket = () => {
  const context = useAnimation()


  useEffect(() => {
    let ws: WebSocket | null = null
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null
    let isConnecting = false

    const connect = () => {
      if (ws?.readyState === WebSocket.OPEN || ws?.readyState === WebSocket.CONNECTING || isConnecting) {
        return
      }
      
      isConnecting = true
      
      try {
        ws = new WebSocket('ws://localhost:4000')

        ws.onerror = (error) => {
          console.error('WebSocket error:', error)
          isConnecting = false
        }

        ws.onclose = () => {
          ws = null
          isConnecting = false
          reconnectTimeout = setTimeout(connect, 1000)
        }

        ws.onopen = () => {
          console.log('WebSocket connected (frontend)')
          isConnecting = false
        }

        ws.onmessage = async event => {
          try {
            const message: Message = JSON.parse(event.data)
            await handleMessage(message, context)
          } catch {
            console.error('Error parsing data:', event.data)
          }
        }
      } catch (error) {
        console.error('Failed to create WebSocket:', error)
        ws = null
        isConnecting = false
        reconnectTimeout = setTimeout(connect, 1000)
      }
    }

    connect()

    return () => {
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout)
      }
      if (ws) {
        ws.close()
      }
    }
  }, [])
}
          