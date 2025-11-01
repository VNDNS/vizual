let ws: WebSocket | null = null
let messageQueue: string[] = []
let isConnecting = false
let reconnectTimeout: ReturnType<typeof setTimeout> | null = null

const connect = () => {
  if (ws?.readyState === WebSocket.OPEN) {
    return
  }
  
  if (ws?.readyState === WebSocket.CONNECTING || isConnecting) {
    return
  }
  
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout)
    reconnectTimeout = null
  }
  
  isConnecting = true
  
  try {
    ws = new WebSocket('ws://localhost:4000')
    
    ws.addEventListener('error', (error) => {
      console.error('WebSocket error:', error)
      isConnecting = false
    })
    
    ws.addEventListener('close', () => {
      ws = null
      isConnecting = false
      reconnectTimeout = setTimeout(() => {
        if (messageQueue.length > 0) {
          connect()
        }
      }, 1000)
    })
    
    ws.addEventListener('open', () => {
      console.log('WebSocket connected')
      isConnecting = false
      while (messageQueue.length > 0 && ws?.readyState === WebSocket.OPEN) {
        const msg = messageQueue.shift()
        if (msg) {
          ws.send(msg)
        }
      }
    })
  } catch (error) {
    console.error('Failed to create WebSocket:', error)
    ws = null
    isConnecting = false
    reconnectTimeout = setTimeout(() => {
      if (messageQueue.length > 0) {
        connect()
      }
    }, 1000)
  }
}

export const sendMessage = (message: string) => {
  if (!ws || ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING) {
    messageQueue.push(message)
    connect()
    return
  }
  
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(message)
  } else if (ws.readyState === WebSocket.CONNECTING) {
    messageQueue.push(message)
  } else {
    messageQueue.push(message)
    connect()
  }
}

