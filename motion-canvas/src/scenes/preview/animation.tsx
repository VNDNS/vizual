
import { makeScene2D }  from '@motion-canvas/2d';
import { all }          from '@motion-canvas/core';
import { waitFor }      from '@motion-canvas/core';
import animationData    from './json/animation.json';
import { Camera }       from '../../components/Camera';
import { Panel }        from '../../components/Panel';
import { Highlighter }  from '../../components/Highlighter';
import { Table } from '../../components/Table'
import { FlowChart } from '../../components/FlowChart'

export default makeScene2D(function* (view) {
  
  const table0 = new Table(animationData.components[0].configuration)
  const table1 = new Table(animationData.components[1].configuration)
  const flowChart2 = new FlowChart(animationData.components[2].configuration)
  const components = [table0, table1, flowChart2]

  const camera = new Camera({})
  const panel = new Panel({data: animationData.panel})
  const highlighter = new Highlighter({view, components})
  view.add(camera)
  view.add(panel)
  view.add(highlighter)
  camera.add(table0)
  camera.add(table1)
  camera.add(flowChart2)


  yield* table0.fadeIn(1)
  yield* waitFor(2)
  yield* table1.fadeIn(1)
})