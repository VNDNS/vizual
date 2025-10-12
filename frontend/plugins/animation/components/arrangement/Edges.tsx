import { useAnimation } from "../../context"
import Edge from "./Edge"

export const Edges = ({edges}: {edges: any[]}) => {

  const { setSelectedEdge, setSelectedNode } = useAnimation()

  if(!edges.length) {
    return null
  }

  const handleClick = (id: string) => {
    setSelectedEdge(id)
    setSelectedNode(null)
  }

  return (
    <>
      {edges.map(edge => (
        <Edge
          {...edge}
          onClick={() => handleClick(edge.id)}
          key={edge.id}
          points={edge.points || []}
        />
      ))}
    </>
  )
}