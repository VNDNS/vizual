
import { makeScene2D }  from '@motion-canvas/2d';
import { all }          from '@motion-canvas/core';
import { waitFor }      from '@motion-canvas/core';
import animationData    from './json/animation.json';
import { Camera }       from '../../components/Camera';
import { Panel }        from '../../components/Panel';
import { Highlighter }  from '../../components/Highlighter';
import { sendDurations } from './sendDurations';
import { FlowChart } from '../../components/FlowChart'

export default makeScene2D(function* (view) {
  
  const flowChart0 = new FlowChart(animationData.components[0].configuration)
  const components = [flowChart0]
  const clips = []

  const camera = new Camera({})
  const panel = new Panel({data: animationData.panel})
  const highlighter = new Highlighter({view, components})
  view.add(camera)
  view.add(panel)
  view.add(highlighter)
  camera.add(flowChart0)


  clips.push(camera.to(0,0,0.7272727272727273,1))
  clips.push({animation: null, duration: 0.2})
  clips.push(flowChart0.fadeIn(['Node 1','Node 2','Node 3'],3.3000000000000003))
  clips.push({animation: null, duration: 0.1})
  clips.push(flowChart0.fadeIn(['Node 4'],1.8))

  sendDurations(clips)

  for (const clip of clips) {
    if (clip.animation) {
      yield* clip.animation
    } else {
      yield* waitFor(clip.duration)
    }
  }
})