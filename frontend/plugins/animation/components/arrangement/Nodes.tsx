import { useAnimation } from "../../context"
import { Node } from "./Node"

export const Nodes = ({nodes}: {nodes: any[]}) => {

  const { selectedNode, selectedNodes } = useAnimation()

  return (
    <>
      {nodes.map(node => (
        <Node {...node} key={node.id} selected={selectedNode === node.id} multiSelected={selectedNodes.includes(node.id)} />
      ))}
    </>
  )
}