import { useAnimation } from "@context/context"
import { useAnimationHooks } from "@context/hooks/useAnimationHooks"
import { useMakeDraggable } from "@context/hooks/useMageDraggable"
import { copy } from "../../../../../common/copy"
import { Point } from "motion-canvas/src/components/functions/Point"
import { id } from "../../../../../common/id"

export const Background = ({points, edges, sections: _sections}: {points: Array<{x: number, y: number, id: string}>, edges: any[], sections: any[]}) => {

  const { components, setComponents, selectedBackgroundNodes, setSelectedBackgroundNodes } = useAnimation()
  const { getSelectedComponent } = useAnimationHooks()
  const component = getSelectedComponent()
  const componentIndex = components.findIndex((c: any) => c.id === component?.id)

  // Calculate midpoints for each polygon side
  const midpoints = edges.map((edge) => {
    const edge1Point1 = points.find(point => point.id === edge.p0) as Point
    const edge1Point2 = points.find(point => point.id === edge.p1) as Point

    return {
      x: (edge1Point1?.x + edge1Point2?.x) / 2,
      y: (edge1Point1?.y + edge1Point2?.y) / 2,
      parentID: edge.id
    }
  })

  const handleDrag = (index: number) => {
    const updatePoints = (x: number, y: number) => {
      const configData = (component?.configuration as any)?.data;
      if (!configData) return;
      const newPoints = configData.points
      newPoints[index] = {x, y, id: points[index].id}
      configData.points = newPoints
      const newComponents = copy(components)
      newComponents[componentIndex] = component
      setComponents(newComponents)
    }
    const handleDragElement = useMakeDraggable(points[index], updatePoints)
    return (e: React.MouseEvent) => handleDragElement(e)
  }

  const handleClick = (index: number) => {
    console.log('handleClick', points)
    setSelectedBackgroundNodes([...selectedBackgroundNodes, points[index].id])
  }

  const handleAddPoint = (index: number) => {
    const newPoint = {... midpoints[index], id: id()}
    const splittedEdge = edges.find((edge: any) => edge.id === midpoints[index].parentID)

    const newEdge1 = {p0: splittedEdge.p0, p1: newPoint.id, id: id()}
    const newEdge2 = {p0: newPoint.id, p1: splittedEdge.p1, id: id()}

    const configData = (component?.configuration as any)?.data;
    if (!configData) return;
    
    // remove the old edge
    const newEdges = configData.edges.filter((edge: any) => edge.id !== splittedEdge.id)
    newEdges.push(newEdge1, newEdge2)


    const newComponents = copy(components)
    const newComponentConfigData = (newComponents[componentIndex].configuration as any).data;
    newComponentConfigData.points.push(newPoint)
    newComponentConfigData.edges = newEdges
    const sections = newComponentConfigData.sections
    if (Array.isArray(sections)) {
      const a = splittedEdge.p0
      const b = splittedEdge.p1
      newComponentConfigData.sections = sections.map((section: any) => {
        const ids: string[] = section.points
        if (!Array.isArray(ids) || ids.length < 2) return section
        const len = ids.length
        for (let i = 0; i < len; i++) {
          const curr = ids[i]
          const next = ids[(i + 1) % len]
          if ((curr === a && next === b) || (curr === b && next === a)) {
            const insertIndex = (i + 1) % len
            const updated = [...ids.slice(0, insertIndex), newPoint.id, ...ids.slice(insertIndex)]
            return { ...section, points: updated }
          }
        }
        return section
      })
    }
    setComponents(newComponents)
  }

  //const sections = component?.configuration.data.sections

  return (
    <g className="background">
      {
        edges?.map((edge) => (
          <polyline
            className="points"
            points={`${points.find(point => point.id === edge.p0)?.x},${points.find(point => point.id === edge.p0)?.y} ${points.find(point => point.id === edge.p1)?.x},${points.find(point => point.id === edge.p1)?.y}`}
            stroke="rgba(255, 0, 0, 0.8)"
            strokeWidth="2"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))
      }
      {points.map((point, index) => (
        <circle className={`point ${selectedBackgroundNodes.includes(point.id) ? "selected" : ""}`} key={index} cx={point.x} cy={point.y} r={10} fill="red" onMouseDown={handleDrag(index)} onClick={() => handleClick(index)} />
      ))}
      {midpoints.map((midpoint, index) => (
        <g key={`midpoint-${index}`} onClick={() => handleAddPoint(index)}>
          <circle className="midpoint" cx={midpoint.x} cy={midpoint.y} r={10} fill="cyan" />
          <text x={midpoint.x} y={midpoint.y} fontSize={12} fill="black" textAnchor="middle" dominantBaseline="middle">{index}</text>
        </g>
      ))}
      {/* {sections?.map((section: number[], index: number) => (
        <g key={`section-${index}`}>
          <polygon points={section.map(i => `${points[i].x},${points[i].y}`).join(' ')} stroke="green" strokeWidth={2} fill="none" />
        </g>
      ))} */}
    </g>
  )
}