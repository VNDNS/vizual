
import { makeScene2D }  from '@motion-canvas/2d';
import { all }          from '@motion-canvas/core';
import { waitFor }      from '@motion-canvas/core';
import animationData    from './json/animation.json';
import { Camera }       from '../../components/Camera';
import { Panel }        from '../../components/Panel';
import { Highlighter }  from '../../components/Highlighter';
import { FlowChart } from '../../components/FlowChart'

export default makeScene2D(function* (view) {
  
  const flowChart0 = new FlowChart(animationData.components[0].configuration)
  const components = [flowChart0]

  const camera = new Camera({})
  const panel = new Panel({data: animationData.panel})
  const highlighter = new Highlighter({view, components})
  view.add(camera)
  view.add(panel)
  view.add(highlighter)
  camera.add(flowChart0)


  yield* flowChart0.fadeIn(['Node 1'],1.8166666666666667)

  yield* flowChart0.fadeIn(['Hi','Node 3'],2.1166666666666667)
  yield* waitFor(0.02)
  yield* flowChart0.fadeIn(['Node 4'],1.8166666666666667)
})