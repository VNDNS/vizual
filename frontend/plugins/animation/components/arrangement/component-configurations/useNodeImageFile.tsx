import { useState, useEffect } from "react"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"

export const useNodeImageFile = () => {
  const [imageFile, setImageFile] = useState<string>('')
  const { getSelectedNode } = useAnimationHooks()
  const selectedNode = getSelectedNode()

  useEffect(() => {
    setImageFile(selectedNode?.image || '')
  }, [selectedNode?.image])

  return { imageFile, setImageFile }
}

