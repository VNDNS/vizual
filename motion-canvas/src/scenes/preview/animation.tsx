
import { makeScene2D }  from '@motion-canvas/2d';
import { all }          from '@motion-canvas/core';
import { waitFor }      from '@motion-canvas/core';
import animationData    from './json/animation.json';
import { Camera }       from '../../components/Camera';
import { Panel }        from '../../components/Panel';
import { Highlighter }  from '../../components/Highlighter';
import { sendDurations } from './sendDurations';
import { FlowChart } from '../../components/FlowChart'
import { BarChart } from '../../components/BarChart'

export default makeScene2D(function* (view) {
  
  const flowChart0 = new FlowChart(animationData.components[0].configuration)
  const barChart1 = new BarChart(animationData.components[1].configuration)
  const components = [flowChart0, barChart1]
  const clips = []

  const camera = new Camera(animationData.cameraInitialState ? { initialX: animationData.cameraInitialState.x, initialY: animationData.cameraInitialState.y, initialZoom: animationData.cameraInitialState.zoom } : {})
  const panel = new Panel({data: animationData.panel})
  const highlighter = new Highlighter({view, components})
  view.add(camera)
  view.add(panel)
  view.add(highlighter)
  camera.add(flowChart0)
  camera.add(barChart1)


  clips.push(flowChart0.fadeIn(['Node 1'],1.8))

  clips.push(barChart1.fadeIn(1.2))

  sendDurations(clips)

  for (const clip of clips) {
    if (clip.animation) {
      yield* clip.animation
    } else {
      yield* waitFor(clip.duration)
    }
  }
})