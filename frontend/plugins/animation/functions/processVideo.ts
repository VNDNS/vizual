export const processVideo = async (
  selectedVideo: string,
  schemaName: string,
  snapshotInterval: number,
  setVideoIsProcessing: (isProcessing: boolean) => void,
  setVideoProcessingError: (error: string | null) => void,
  setVideoProcessingResult: (result: any) => void
) => {
  if (!selectedVideo) return

  setVideoIsProcessing(true)
  setVideoProcessingError(null)
  setVideoProcessingResult(null)

  try {
    const response = await fetch('http://localhost:3009/process-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        videoName: selectedVideo,
        schemaName,
        contextWindow: 3,
        snapshotInterval,
      }),
    })

    const data = await response.json()

    if (data.success) {
      setVideoProcessingResult(data)
    } else {
      setVideoProcessingError(data.error || 'Failed to process video')
    }
  } catch (err: any) {
    setVideoProcessingError(err.message || 'An error occurred while processing the video')
  } finally {
    setVideoIsProcessing(false)
  }
}

