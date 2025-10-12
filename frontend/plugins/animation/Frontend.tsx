import { useSetPreview } from '../common/hooks/useSetPreview';
import { ArrangementLayout } from './Layouts/ArrangementLayout';
import { ImageGenerationLayout } from './Layouts/ImageGenerationLayout';
import { VideoProcessingLayout } from './Layouts/VideoProcessingLayout';
import { useAnimation } from './context';
import { useGetAudio } from './hooks/useGetAudio';
import { useWebSocket } from './hooks/useWebSocket';

export const Frontend = () => {
  
  const { mode } = useAnimation();

  useSetPreview()
  useGetAudio()
  useWebSocket()

  return (
    <>
      {mode === 'arrangement' && <ArrangementLayout />}
      {mode === 'image-generation' && <ImageGenerationLayout />}
      {mode === 'video-processing' && <VideoProcessingLayout />}
    </>
  );
};
