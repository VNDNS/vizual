import { useAnimation } from "../../context"
import { useAnimationHooks } from "../../hooks/useAnimationHooks"
import { id } from "../../../../../common/id"
import { copy } from "../../../../../common/copy"
import { useComputeEdges } from "@context/hooks/useComputeEdges"
import { FlowChartConfiguration, FlowChartEdge, EdgeSide } from "../../../../../types/FlowChartTypes"
import { ComponentUI } from "../../../../../types/ComponentUI"
import { OptionSelection } from "../common/OptionSelection"

export const EdgeConfiguration = () => {

  const { setAnimation, animation, setComponents, components } = useAnimation()
  const { getSelectedComponent, getSelectedNode } = useAnimationHooks()
  const { computeEdges } = useComputeEdges()

  const component = getSelectedComponent()

  const selectedNode = getSelectedNode()
  const selectedNodeId = selectedNode?.id
  const parentNodeId = selectedNode?.parent

  const config = component?.configuration as FlowChartConfiguration | undefined
  const selectedEdge = config?.data.edges.find((e: FlowChartEdge) => e.sourceId === parentNodeId && e.targetId === selectedNodeId)?.id

  const currentEdge = config?.data?.edges?.find((e: FlowChartEdge) => e.id === selectedEdge)

  const addAnimation = () => {
    const index = config?.data.edges?.findIndex((edge: FlowChartEdge) => edge.id === selectedEdge)
    const newAnimation = { component: component?.name || '', method: 'activate', duration: 109/60, start: animation.length, inputs: {index: index}, track: 0, id: id() }
    setAnimation([...animation, newAnimation])
  }

  const addDeactivateAnimation = () => {
    const index = config?.data.edges?.findIndex((edge: FlowChartEdge) => edge.id === selectedEdge)
    const newAnimation = { component: component?.name || '', method: 'deactivate', duration: 1, start: animation.length, inputs: {index: index}, track: 0, id: id() }
    setAnimation([...animation, newAnimation])
  }

  const configureEdge = (point: number, side: EdgeSide) => {
    const newComponents = copy(components)
    const edges = config?.data.edges
    const index = newComponents.findIndex((c: ComponentUI) => c.id === component?.id)
    const edge = edges?.find((e: FlowChartEdge) => e.id === selectedEdge)
    console.log(edge)
    if(!edge) return
    if(point === 0) {
      edge.startSide = side
    } else {
      edge.endSide = side
    }
    const componentConfig = newComponents[index].configuration as FlowChartConfiguration
    componentConfig.data.edges = edges || []
    setComponents(newComponents)
    const selectedConfig = getSelectedComponent()?.configuration as FlowChartConfiguration | undefined
    if (selectedConfig) {
      computeEdges(selectedConfig.data.nodes)
    }
  }

  const configureC0 = (value: number) => {
    const newComponents = copy(components)
    const edges = config?.data.edges
    const index = newComponents.findIndex((c: ComponentUI) => c.id === component?.id)
    const edge = edges?.find((e: FlowChartEdge) => e.id === selectedEdge)
    if(!edge) return
    edge.c0 = value
    const componentConfig = newComponents[index].configuration as FlowChartConfiguration
    componentConfig.data.edges = edges || []
    setComponents(newComponents)
    const selectedConfig = getSelectedComponent()?.configuration as FlowChartConfiguration | undefined
    if (selectedConfig) {
      computeEdges(selectedConfig.data.nodes)
    }
  }

  const configureC1 = (value: number) => {
    const newComponents = copy(components)
    const edges = config?.data.edges
    const index = newComponents.findIndex((c: ComponentUI) => c.id === component?.id)
    const edge = edges?.find((e: FlowChartEdge) => e.id === selectedEdge)
    if(!edge) return
    edge.c1 = value
    console.log('configureC1', value)
    const componentConfig = newComponents[index].configuration as FlowChartConfiguration
    componentConfig.data.edges = edges || []
    setComponents(newComponents)
    const selectedConfig = getSelectedComponent()?.configuration as FlowChartConfiguration | undefined
    if (selectedConfig) {
      computeEdges(selectedConfig.data.nodes)
    }
  }

  return (
    <>
      <div >{selectedEdge || 'No edge available'}</div>
      <button onClick={() => addAnimation()}> Activate</button>
      <button onClick={() => addDeactivateAnimation()}> Deactivate</button>
      <div className="edge-configuration-sides">
        <OptionSelection 
          label="Start Side"
          options={['top', 'bottom', 'left', 'right']} 
          setValue={(side) => configureEdge(0, side as EdgeSide)} 
          value={currentEdge?.startSide || ''} 
        />
        <OptionSelection 
          label="End Side"
          options={['top', 'bottom', 'left', 'right']} 
          setValue={(side) => configureEdge(1, side as EdgeSide)} 
          value={currentEdge?.endSide || ''} 
        />
      </div>
      <div>
        <label>c0: {Number(currentEdge?.c0 ?? 0.5).toFixed(2)}</label>
        <input type="range" min={0.1} max={0.9} step={0.01} value={currentEdge?.c0 ?? 0.5} onChange={(e) => configureC0(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>c1: {Number(currentEdge?.c1 ?? 10).toFixed(2)}</label>
        <input type="range" min={0.1} max={500} step={0.1} value={currentEdge?.c1 ?? 10} onChange={(e) => configureC1(parseFloat(e.target.value))} />
      </div>

    </>
  )
}