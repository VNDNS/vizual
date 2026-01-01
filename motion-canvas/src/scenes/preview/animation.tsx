
import { makeScene2D }  from '@motion-canvas/2d';
import { all }          from '@motion-canvas/core';
import { waitFor }      from '@motion-canvas/core';
import animationData    from './json/animation.json';
import { Camera }       from '../../components/Camera';
import { Panel }        from '../../components/Panel';
import { Highlighter }  from '../../components/Highlighter';
import { sendDurations } from './sendDurations';
import { Molecule } from '../../components/Molecule'

export default makeScene2D(function* (view) {
  
  const molecule0 = new Molecule(animationData.components[0].configuration)
  const molecule1 = new Molecule(animationData.components[1].configuration)
  const components = [molecule0, molecule1]
  const clips = []

  const camera = new Camera(animationData.cameraInitialState ? { initialX: animationData.cameraInitialState.x, initialY: animationData.cameraInitialState.y, initialZoom: animationData.cameraInitialState.zoom } : {})
  const panel = new Panel({data: animationData.panel})
  const highlighter = new Highlighter({view, components})
  view.add(camera)
  view.add(panel)
  view.add(highlighter)
  camera.add(molecule0)
  camera.add(molecule1)


  clips.push(molecule0.fadeIn(1))
  clips.push({animation: null, duration: 2})
  clips.push(molecule0.fadeOut(1))

  sendDurations(clips)

  for (const clip of clips) {
    if (clip.animation) {
      yield* clip.animation
    } else {
      yield* waitFor(clip.duration)
    }
  }
})