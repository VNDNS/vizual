import { useEffect } from "react"
import { useGlobal } from "../../common/context"
import { useAnimation } from "../context"
import { Scene } from "../../../../types/Scene"

export const useSetScene = () => {
  const { setCurrentObject } = useGlobal()
  const { animation, components, numTimelines } = useAnimation()

  useEffect(() => {
    const scene: Scene = { components, animation, tracks: numTimelines}
    setCurrentObject(scene)
  }, [animation, components, numTimelines])
} 