import { useEffect } from "react"
import { useGlobal } from "../../common/context"
import { useAnimation } from "../context"
import { getJson } from "../../common/requests/get-json"

export const useFetchAnimation = () => {
  const { selectedFile, currentPlugin } = useGlobal()
  const { setAnimation, setComponents, setNumTimelines } = useAnimation()
  
  const fetchFile = async () => {
    const { animation, components, tracks } = await getJson(`./motion-canvas/src/animations/${selectedFile}`)
    setAnimation(animation)
    setComponents(components)
    setNumTimelines(tracks)
  }
  
  useEffect(() => {
    if (currentPlugin !== 'animation' || !selectedFile) return
    fetchFile()
  }, [selectedFile])
} 