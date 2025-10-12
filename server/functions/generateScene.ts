import { writeFileSync }          from "fs"
import { generateAnimations }     from "./generateAnimations"
import { generateInstantiations } from "./generateInstantiations"
import { generateShapeAddings }   from "./generateShapeAddings"
import { generateImports } from "./generateImports"

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
${imports}

export default makeScene2D(function* (view) {
  
${instantiations}

${shapeAddings}

${animations}
})`

  writeFileSync('./motion-canvas/src/scenes/preview/animation.tsx', sceneString)
}