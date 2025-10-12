import { useAnimation } from "@context/context";
import { getAudioClips } from "@context/requests/getAudioClips";
import { id } from "../../../../common/id";
import { useEffect } from "react";

export const useGetAudio = () => {
  const { setAudioClips } = useAnimation();

  useEffect(() => {
    const fetchAudioClips = async () => {
      const clips = await getAudioClips();
      
      
      
      const clipObjects: any[] = []
      let start = 0

      clips.forEach((clip: any) => {
        clipObjects.push({
          name: clip.name,
          duration: clip.duration,
          start: start,
          id: id(),
        })
        start += clip.duration
      })
      
      setAudioClips(clipObjects);

    };
    fetchAudioClips();
  }, []);
}