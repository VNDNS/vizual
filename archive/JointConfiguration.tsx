import { useAnimation } from "@context/context"
import { useAnimationHooks } from "@context/hooks/useAnimationHooks"
import { ComponentUI } from "types/ComponentUI"

export const JointConfiguration = () => {

  const { setComponents, selectedJoint } = useAnimation()
  const { getSelectedComponent, computeEdges } = useAnimationHooks()

  const selectedComponent_ = getSelectedComponent()
  const configData = (selectedComponent_?.configuration as any)?.data;
  const allJoints = configData?.edges?.flatMap((edge: any) => edge.joints)
  const selectedJoint_ = allJoints?.find((joint: any) => joint.id === selectedJoint)

  const handleAddNode = async () => {
    if (!selectedComponent_ || !configData || !selectedJoint_) return;
    
    const node: any = {}
    node.id = configData.nodes.length + 1
    node.children = []
    node.x = selectedJoint_.x + 100
    node.y = selectedJoint_.y
    node.year = 0
    node.text = ''
    node.suggestedChildren = []
    node.name = `Node ${configData.nodes.length + 1}`

    const newNodes = [...configData.nodes, node]

    selectedJoint_.children.push(node.id)

    setComponents((prevData: ComponentUI[]) => {
      const newComponents = prevData.map((r: ComponentUI) => (r.id === selectedComponent_?.id ? { ...r, configuration: { ...r.configuration, data: { ...(r.configuration as any).data, nodes: newNodes } } } as ComponentUI : r))
      return newComponents
    })
    computeEdges(newNodes)
  }


  return (
    <div className="joint-configuration">
      Joint Configuration
      <button onClick={handleAddNode}> Add Node </button>
    </div>
  )
}