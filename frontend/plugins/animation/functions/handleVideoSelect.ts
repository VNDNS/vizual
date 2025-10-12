export const handleVideoSelect = async (
  video: string,
  setSelectedVideo: (video: string) => void,
  setVideoPlaybackPosition: (position: number) => void,
  setVideoProcessingResult: (result: any) => void,
  setVideoProcessingError: (error: string | null) => void
) => {
  setSelectedVideo(video)
  setVideoPlaybackPosition(0)
  setVideoProcessingResult(null)
  setVideoProcessingError(null)

  try {
    const response = await fetch(`http://localhost:3009/video-analysis/${encodeURIComponent(video)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (data.success) {
      setVideoProcessingResult(data)
    }
  } catch (err: any) {
    console.log('No analysis found for this video')
  }
}

