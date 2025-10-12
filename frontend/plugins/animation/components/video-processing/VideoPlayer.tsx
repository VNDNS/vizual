import { useRef, useEffect } from 'react'
import { useAnimation } from '../../context'

export const VideoPlayer = () => {
  const { selectedVideo, videoPlaybackPosition, setVideoPlaybackPosition } = useAnimation()
  const videoRef = useRef<HTMLVideoElement>(null)
  const isSeekingRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !selectedVideo) return

    const handleTimeUpdate = () => {
      if (!isSeekingRef.current) {
        setVideoPlaybackPosition(video.currentTime)
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [selectedVideo, setVideoPlaybackPosition])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const timeDifference = Math.abs(video.currentTime - videoPlaybackPosition)
    if (timeDifference > 0.5) {
      isSeekingRef.current = true
      video.currentTime = videoPlaybackPosition
      setTimeout(() => {
        isSeekingRef.current = false
      }, 100)
    }
  }, [videoPlaybackPosition])

  if (!selectedVideo) return null

  return (
    <video
      ref={videoRef}
      controls
      src={`http://localhost:3009/videos/${selectedVideo}`}
      style={{ maxWidth: '100%', maxHeight: '100%' }}
    />
  )
}

