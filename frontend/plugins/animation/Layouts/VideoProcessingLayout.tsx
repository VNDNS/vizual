import { useEffect } from 'react'
import { useSetCurrentPlugin } from '../../common/hooks/useSetCurrentPlugin'
import { ModeSelection } from '../components/common/ModeSelection'
import { useAnimation } from '../context'
import { pages } from '@context/constants'
import { FileDisplay } from '../../common/components/FileDisplay'
import { VideoPlayer } from '../components/video-processing/VideoPlayer'
import { VideoInfo } from '../components/video-processing/VideoInfo'
import { VideoAnalysisPlot } from '../components/video-processing/VideoAnalysisPlot'
import { handleVideoSelect } from '../functions/handleVideoSelect'
import { getDirectory } from '../../common/requests/get-directory'
import { getJson } from '../../common/requests/get-json'

export const VideoProcessingLayout = () => {
  useSetCurrentPlugin('video-processing')
  
  const { 
    mode, 
    setMode, 
    selectedVideo, 
    setSelectedVideo,
    setVideoPlaybackPosition,
    setVideoProcessingResult,
    setVideoProcessingError,
    setVideoAnalysisData
  } = useAnimation()

  useEffect(() => {
    const loadAnalysisFiles = async () => {
      try {
        const files = await getDirectory('video-analysis')
        console.log('files', files)
        console.log('Available analysis files:', files)
        
        if (files && files.length > 0) {
          const firstFile = files[0]
          const fullPath = `/home/viktor/code/vizual/server/data/video-analysis/${firstFile}`
          const analysisData = await getJson(fullPath)
          setVideoAnalysisData(analysisData)
          console.log('Loaded analysis data:', analysisData)
        }
      } catch (error) {
        console.error('Error loading analysis files:', error)
      }
    }
    
    loadAnalysisFiles()
  }, [setVideoAnalysisData])

  const onVideoSelect = (video: string) => {
    handleVideoSelect(
      video,
      setSelectedVideo,
      setVideoPlaybackPosition,
      setVideoProcessingResult,
      setVideoProcessingError
    )
  }

  return (
    <div className="animation plugin">
      <div className="configuration">
        <ModeSelection options={pages} setMode={setMode} mode={mode} />
        <FileDisplay directoryKey="videos" state={selectedVideo} setState={onVideoSelect} />
        <VideoInfo />
      </div>
      <div className="main video-processing">
        {selectedVideo && (
          <>
            <div className="video-player">
              <VideoPlayer />
            </div>
            <VideoAnalysisPlot />
          </>
        )}
      </div>
    </div>
  )
}

