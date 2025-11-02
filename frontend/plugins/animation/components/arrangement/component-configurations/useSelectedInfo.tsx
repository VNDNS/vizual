import { useState, useEffect } from "react"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"

export const useSelectedInfo = () => {
  const [selectedInfo, setSelectedInfo] = useState<string>('')
  const { getSelectedNode } = useAnimationHooks()
  const selectedNode = getSelectedNode()

  useEffect(() => {
    if (!selectedNode?.infos?.find((info: any) => info.id === selectedInfo)) {
      setSelectedInfo('')
    }
  }, [selectedNode, selectedInfo])

  return { selectedInfo, setSelectedInfo }
}

