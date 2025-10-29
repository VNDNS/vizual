import { useAnimation } from "@context/context"
import { useAnimationHooks } from "@context/hooks/useAnimationHooks"
import { copy } from "../common/copy"
import { id } from "../common/id"
import { useState } from "react"

export const BackgroundConfiguration = () => {

  const { setDrawingBackground, selectedBackgroundNodes, components, setComponents, animation, setAnimation } = useAnimation()
  const { getSelectedComponent } = useAnimationHooks()

  const [selectedSection, setSelectedSection] = useState<number | null>(null)

  const handleDrawBackground = () => {
    setDrawingBackground(true)
  }

  const handleStopDrawingBackground = () => {
    setDrawingBackground(false)
  }

  const handleAddSection = () => {

    if (selectedBackgroundNodes.length !== 2) return
    const component = getSelectedComponent()
    const newComponents = copy(components)
    const componentIndex = newComponents.findIndex((c: any) => c.id === component?.id)
    const configData = (component?.configuration as any)?.data;
    const points = configData?.points
    if (!component || !Array.isArray(points)) return

    const [idA, idB] = selectedBackgroundNodes


    configData.edges.push({p0: idA, p1: idB, id: id()})

    const sections = configData.sections
    if (Array.isArray(sections) && sections.length > 0) {
      const sectionIndex = sections.findIndex((s: any) => Array.isArray(s.points) && s.points.includes(idA) && s.points.includes(idB))
      if (sectionIndex !== -1) {
        const section = sections[sectionIndex]
        const sectionPoints: string[] = section.points
        const idxA = sectionPoints.indexOf(idA as string)
        const idxB = sectionPoints.indexOf(idB as string)
        if (idxA !== -1 && idxB !== -1) {
          const getPath = (arr: string[], start: number, end: number) => {
            const result: string[] = []
            let i = start
            while (true) {
              result.push(arr[i])
              if (i === end) break
              i = (i + 1) % arr.length
            }
            return result
          }
          const pathAB = getPath(sectionPoints, idxA, idxB)
          const pathBA = getPath(sectionPoints, idxB, idxA)
          if (pathAB.length >= 3 && pathBA.length >= 3) {
            const newSection1 = { points: pathAB, id: id() }
            const newSection2 = { points: pathBA, id: id() }
            configData.sections.splice(sectionIndex, 1, newSection1, newSection2)
          }
        }
      }
    }
    newComponents[componentIndex] = component
    setComponents(newComponents)
  }

  const component = getSelectedComponent()
  const configData = (component?.configuration as any)?.data;
  const sections = configData?.sections
  console.log(component)

  const handleSelectSection = (index: number) => {
    if (index === selectedSection) {
      setSelectedSection(null)
      return
    }
    setSelectedSection(index)
  }

  const addBackgroundFadeIn = (index: number | null) => {
    if (index === null) return
    const newAnimation = { 
      component: component?.name || '', 
      method: 'activate', 
      duration: 1, 
      start: animation.length, 
      inputs: { index }, 
      track: 0, 
      id: id() 
    }
    setAnimation([...animation, newAnimation])
  }

  return (
    <>
      <button onClick={handleDrawBackground}>Draw Background</button>
      <button onClick={handleStopDrawingBackground}>Stop Drawing Background</button>
      <button onClick={handleAddSection}> Add section </button>
      <button disabled={selectedSection === null} onClick={() => addBackgroundFadeIn(selectedSection)}> Add fade in </button>
      <div className="background-section-items">
      {sections?.map((section: any, index: number) => (
        <div 
          key={section.id}
          className={`background-section-item ${selectedSection === index ? 'background-section-item-selected' : ''}`} 
          style={{ backgroundColor: section.color }}
          onClick={() => handleSelectSection(index)}
        >
          <div className="background-section-item-values">
          </div>
        </div>
      ))}
    </div>
    </>
  )
}