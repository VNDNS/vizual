import { useEffect } from "react"
import { setPreview } from "../requests/set-preview"
import { useAnimation } from "../../animation/context"
import { saveJson } from "../../common/requests/save-json"
import { getJson } from "../requests/get-json"

export const useSetPreview = () => {

  const { animation, components, currentData, selectedComponent, panelData, audioClips } = useAnimation()

  
  useEffect(() => {
  
    const scene = { components, animation, tracks: 1, panel: panelData, audio: audioClips}
    setPreview('animation', scene)
    
  }, [components, panelData, audioClips])
  
  useEffect(() => {

    const fullPath = 'motion-canvas/src/scenes/preview/json/animation.json'
    getJson(fullPath).then(data => {
      data.components.forEach((component: any) => {
        if (component.id === selectedComponent) {
          component.configuration.data = currentData
        }
      })
      saveJson(data, fullPath);
    })
    
  }, [currentData])
}