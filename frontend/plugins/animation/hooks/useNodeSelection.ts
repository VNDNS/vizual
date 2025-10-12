import { useAnimation } from "../context"

export const useNodeSelection = (hasDraggedRef: React.MutableRefObject<boolean>) => {
  const { 
    setSelectedNode, 
    setSelectedEdge, 
    setSelectedNodes, 
    selectedNodes,
    setSidebarMode,
    setShowSidebar,
    setSelectedItems
  } = useAnimation()

  const handleNodeClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()

    setSidebarMode('node-configuration')
    setShowSidebar(true)

    if (hasDraggedRef.current) {
      hasDraggedRef.current = false
      return
    }

    if (e.shiftKey) {
      setSelectedNodes([...selectedNodes, id])
    } else {
      setSelectedNodes([id])
      setSelectedNode(id)
    }
    setSelectedEdge(null)
  }

  return {
    handleNodeClick
  }
}

