
import { makeScene2D }  from '@motion-canvas/2d';
import { all }          from '@motion-canvas/core';
import { waitFor }      from '@motion-canvas/core';
import animationData    from './json/animation.json';
import { Camera }       from '../../components/Camera';
import { Panel }        from '../../components/Panel';
import { Highlighter }  from '../../components/Highlighter';
import { Item } from '../../components/Item'
import { FlowChart } from '../../components/FlowChart'

export default makeScene2D(function* (view) {
  
  const item0 = new Item(animationData.components[0].configuration)
  const flowChart1 = new FlowChart(animationData.components[1].configuration)
  const components = [item0, flowChart1]

  const camera = new Camera({})
  const panel = new Panel({data: animationData.panel})
  const highlighter = new Highlighter({view, components})
  view.add(camera)
  view.add(panel)
  view.add(highlighter)
  camera.add(item0)
  camera.add(flowChart1)


})