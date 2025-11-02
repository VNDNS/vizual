import { writeFileSync }          from "fs"
import { generateAnimations }     from "./generateAnimations"
import { generateInstantiations } from "./generateInstantiations"
import { generateShapeAddings }   from "./generateShapeAddings"
import { generateImports } from "./generateImports"

export const generateClips = (scene: any) => {
  const clips = scene.animation.map((clip: any, i: number) => {
    return `  const clip${i} = ${clip.name}(${clip.args})`
  })
  return clips.join('\n')
}

export function generateScene(scene: any) {

  const instantiations  = generateInstantiations(scene.components)
  const shapeAddings    = generateShapeAddings(scene.components)
  const animations      = generateAnimations(scene)
  const imports         = generateImports(scene.components)

  const sceneString = `
import { makeScene2D }  from '@motion-canvas/2d';
import { all }          from '@motion-canvas/core';
import { waitFor }      from '@motion-canvas/core';
import animationData    from './json/animation.json';
import { Camera }       from '../../components/Camera';
import { Panel }        from '../../components/Panel';
import { Highlighter }  from '../../components/Highlighter';
import { sendDurations } from './sendDurations';
${imports}

export default makeScene2D(function* (view) {
  
${instantiations}

${shapeAddings}

${animations}

  sendDurations(clips)

  for (const clip of clips) {
    if (clip.animation) {
      yield* clip.animation
    } else {
      yield* waitFor(clip.duration)
    }
  }
})`

  writeFileSync('./motion-canvas/src/scenes/preview/animation.tsx', sceneString)
}