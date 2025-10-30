
import { makeScene2D }  from '@motion-canvas/2d';
import { all }          from '@motion-canvas/core';
import { waitFor }      from '@motion-canvas/core';
import animationData    from './json/animation.json';
import { Camera }       from '../../components/Camera';
import { Panel }        from '../../components/Panel';
import { Highlighter }  from '../../components/Highlighter';
import { Clock } from '../../components/Clock'

export default makeScene2D(function* (view) {
  
  const clock0 = new Clock(animationData.components[0].configuration)
  const components = [clock0]

  const camera = new Camera({})
  const panel = new Panel({data: animationData.panel})
  const highlighter = new Highlighter({view, components})
  view.add(camera)
  view.add(panel)
  view.add(highlighter)
  camera.add(clock0)


  yield* clock0.fadeIn(1)

  yield* clock0.animateHands(6)
})