import { useRef, useEffect } from 'react'
import { useAnimation } from '../../context'

export const VideoPlayer = () => {
  const { selectedVideo, setVideoPlaybackPosition } = useAnimation()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !selectedVideo) return

    const handleTimeUpdate = () => {
      setVideoPlaybackPosition(video.currentTime)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [selectedVideo, setVideoPlaybackPosition])

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

