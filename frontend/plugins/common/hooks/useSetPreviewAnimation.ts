import { useAnimation } from "@context/context";
import { setPreview } from "../requests/set-preview";

export const useSetPreviewAnimation = () => {
  const { animation, components, panelData, audioClips } = useAnimation();

  const setPreviewAnimation = (updatedAnimation?: typeof animation) => {
    const animationToUse = updatedAnimation ?? animation;
    const scene = { components, animation: animationToUse, tracks: 1, panel: panelData, audio: audioClips };
    setPreview('animation', scene);
  }

  return setPreviewAnimation;
};
