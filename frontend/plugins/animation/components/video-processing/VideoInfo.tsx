import { useAnimation } from '../../context'
import { processVideo } from '../../functions/processVideo'
import { useVideoSchemas } from '../../hooks/useVideoSchemas'

export const VideoInfo = () => {
  const { 
    selectedVideo, 
    videoPlaybackPosition,
    videoIsProcessing,
    videoProcessingResult,
    videoProcessingError,
    selectedVideoSchema,
    videoSnapshotInterval,
    setVideoIsProcessing,
    setVideoProcessingResult,
    setVideoProcessingError,
    setSelectedVideoSchema,
    setVideoSnapshotInterval
  } = useAnimation()

  const schemas = useVideoSchemas()

  const handleProcessVideo = () => {
    processVideo(
      selectedVideo!,
      selectedVideoSchema,
      videoSnapshotInterval,
      setVideoIsProcessing,
      setVideoProcessingError,
      setVideoProcessingResult
    )
  }

  return (
    <div className="video-info">
      <p>Current Position: {videoPlaybackPosition.toFixed()}s</p>
      <div style={{ marginTop: '10px' }}>
        <label>Schema: </label>
        <select 
          value={selectedVideoSchema} 
          onChange={(e) => setSelectedVideoSchema(e.target.value)}
          disabled={videoIsProcessing}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          {schemas.map(schema => (
            <option key={schema} value={schema}>{schema}</option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Snapshot Interval (seconds): </label>
        <input 
          type="number"
          value={videoSnapshotInterval}
          onChange={(e) => setVideoSnapshotInterval(Number(e.target.value))}
          disabled={videoIsProcessing}
          min={1}
          step={1}
          style={{ marginLeft: '10px', padding: '5px', width: '60px' }}
        />
      </div>
      <button 
        onClick={handleProcessVideo} 
        disabled={videoIsProcessing || !selectedVideo}
        style={{ marginTop: '10px', padding: '10px 20px', cursor: videoIsProcessing ? 'not-allowed' : 'pointer' }}
      >
        {videoIsProcessing ? 'Processing...' : 'Process Video'}
      </button>
      {videoProcessingError && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          Error: {videoProcessingError}
        </div>
      )}
      {videoProcessingResult && (
        <h3>Processing Complete!</h3>
      )}
    </div>
  )
}

