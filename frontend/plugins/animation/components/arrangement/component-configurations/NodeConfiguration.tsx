import { FileDisplay } from "../../../../common/components/FileDisplay"
import { useAnimation } from "../../../context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"
import { useEffect, useState } from "react"
import { OptionSelection } from "../../common/OptionSelection"
import { ArrayConfiguration } from "../../common/ArrayConfiguration"
import { useComputeEdges } from "@context/hooks/useComputeEdges"
import { FlowChartNode } from "@type/FlowChartTypes"
import { id } from "../../../../../../common/id"

export const NodeConfiguration = () => {
  const { setComponents, components, setAnimation, animation } = useAnimation()
  const { getSelectedNode, getSelectedComponent, getNodes, getSelectedNodes } = useAnimationHooks()
  const nodes = getNodes()
  const { computeEdges } = useComputeEdges()

  const [imageFile, setImageFile] = useState<string>('')
  const [selectedInfo, setSelectedInfo] = useState<string>('')

  const selectedNode = getSelectedNode()
  const selectedComponent_ = getSelectedComponent()

  useEffect(() => {
    setImageFile(selectedNode?.image || '')
  }, [selectedNode?.image])

  if(selectedComponent_?.type !== 'flowChart') {
    return null
  }

  const setImage = (image: string) => {
    selectedNode.image = image
    setComponents([...components])
  }

  const handleSetName = (name: string) => {
    selectedNode.name = name
    setComponents([...components])
  }

  const handleSetNodeType = (type: string) => {
    selectedNode.type = type
    setComponents([...components])
  }

  const handleSetWidth = (value: number) => {
    selectedNode.width = value
    setComponents([...components])
    computeEdges()
  }

  const handleSetHeight = (value: number) => {
    selectedNode.height = value
    setComponents([...components])
    computeEdges()
  }

  const handleDeleteNode = () => {
    const nodes = getNodes()
    if (selectedNode.parent) {
      const parent = nodes.find((node: any) => node.id === selectedNode.parent)
      if (parent) {
        parent.children = parent.children.filter((child: any) => child !== selectedNode.id)
      }
    }
    if (Array.isArray(selectedNode.parents)) {
      selectedNode.parents.forEach((parentId: any) => {
        const parent = nodes.find((node: any) => node.id === parentId)
        if (parent) {
          parent.children = parent.children.filter((child: any) => child !== selectedNode.id)
        }
      })
    }
    nodes.splice(nodes.indexOf(selectedNode), 1)
    setComponents([...components])
  }

  const handleAddNode = () => {
    const selectedNodes_ = getSelectedNodes()
    const newNodeId = Math.floor(Math.random() * 1000000)
    
    let newNodeX = (selectedNode?.x ?? 0) + 300
    let newNodeY = selectedNode?.y ?? 0
    
    if (selectedNodes_.length > 1) {
      const avgX = selectedNodes_.reduce((sum, n) => sum + (n.x ?? 0), 0) / selectedNodes_.length
      const avgY = selectedNodes_.reduce((sum, n) => sum + (n.y ?? 0), 0) / selectedNodes_.length
      newNodeX = avgX + 300
      newNodeY = avgY
    }

    const node: any = {
      id: newNodeId,
      children: [],
      x: newNodeX,
      y: newNodeY,
      year: 0,
      startSide: 'right',
      endSide: 'left',
      text: '',
      suggestedChildren: [],
      name: `Node ${nodes.length + 1}`,
      componentId: selectedComponent_.id,
      type: 'square',
      width: 240,
      height: 240
    }

    if (selectedNodes_.length > 1) {
      node.parents = selectedNodes_.map(n => n.id)
      selectedNodes_.forEach((selectedNode_) => {
        selectedNode_.children.push(newNodeId)
      })
    } else if (selectedNode) {
      node.parent = selectedNode.id
      selectedNode.children.push(newNodeId)
    }
    
    const newNodes = [...nodes, node]
    selectedComponent_.configuration.data.nodes = newNodes
    setComponents([...components])
    computeEdges()
  }

  const fadeInNodes = () => {
    const selectedNodes_ = getSelectedNodes()
    const selectedComponent_ = getSelectedComponent()
    const duration = (selectedNodes_.length-1) * .3 + 109/60
    const lastAnimation = animation.at(-1)
    const start = (lastAnimation?.start ?? 0) + (lastAnimation?.duration ?? 0)
    const newAnimation = { component: selectedComponent_?.name || '', method: 'fadeIn', duration: duration, start: start, inputs: { nodes: selectedNodes_.map((node: FlowChartNode) => node.name) }, track: 0, id: id() }
    setAnimation([...animation, newAnimation])
  }

  const handleAddInfo = () => {
    if (!selectedNode.infos) {
      selectedNode.infos = []
    }
    const infos = selectedNode.infos
    infos.push({ name: 'Info ' + infos.length, id: id() })
    setComponents([...components])
  }

  const handleSetSelectedInfo = (id: string) => {
    setSelectedInfo(id)
  }

  const handleSetInfoValue = (value: string) => {
    const index = selectedNode?.infos?.findIndex((info: any) => info.id === selectedInfo)
    if (index !== undefined && index !== -1) {
      selectedNode.infos[index].name = value
      setComponents([...components])
    }
  }

  const handleDeleteInfo = (id: string) => {
    if (selectedNode?.infos) {
      selectedNode.infos = selectedNode.infos.filter((info: any) => info.id !== id)
      if (selectedInfo === id) {
        setSelectedInfo('')
      }
      setComponents([...components])
    }
  }

  const selectedInfo_ = selectedNode?.infos?.find((info: any) => info.id === selectedInfo)

  return (
    <>
      <div className="input-group">
        <span>Name</span>
        <input type="text" value={selectedNode?.name} onChange={(e) => handleSetName(e.target.value)} />
      </div>
      <FileDisplay directoryKey="node-image" state={imageFile} setState={setImage} />
      <div className="node-type-selection">
        <OptionSelection label="Node Type" options={['square', 'circle', 'text']} setValue={handleSetNodeType} value={selectedNode?.type || ''} />
      </div>
      <div className="input-group">
        <span>Width</span>
        <input type="number" step={60} value={selectedNode?.width ?? 240} onChange={(e) => handleSetWidth(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <span>Height</span>
        <input type="number" step={60} value={selectedNode?.height ?? 240} onChange={(e) => handleSetHeight(Number(e.target.value))} />
      </div>
      <button onClick={handleDeleteNode}>Delete</button>
      <button onClick={handleAddNode}>Add Node</button>
      <button onClick={fadeInNodes}>Fade In Nodes</button>
      <div className="input-group">
        <span>Info</span>
        <input type="text" value={selectedInfo_?.name} onChange={(e) => handleSetInfoValue(e.target.value)} />
      </div>
      <button onClick={handleAddInfo}>Add Info</button>
      <ArrayConfiguration options={selectedNode?.infos} setValue={handleSetSelectedInfo} value={selectedInfo} onDelete={handleDeleteInfo} />
    </>
  )
}