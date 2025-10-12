import { useState, useEffect } from 'react'

export const useVideoSchemas = () => {
  const [schemas, setSchemas] = useState<string[]>([])

  useEffect(() => {
    const fetchSchemas = async () => {
      try {
        const response = await fetch('http://localhost:3009/video-schemas')
        const data = await response.json()
        if (data.success) {
          setSchemas(data.schemas)
        }
      } catch (error) {
        console.error('Failed to fetch video schemas:', error)
      }
    }
    
    fetchSchemas()
  }, [])

  return schemas
}

