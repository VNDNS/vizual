import path from 'path'
import { fileURLToPath } from 'url'

export const sceneName = 'example'
export const port      = 3009

const root         = '/home/viktor/code/vizual'
const mc           = `${root}/motion-canvas/src`
const server       = `${root}/server`
const frontend     = `${root}/frontend`
const endpoints    = `${server}/endpoints`
const plugins      = `${frontend}/plugins`
const scenes       = `${mc}/scenes`
const plots        = `${mc}/plots`
const latex        = `${mc}/latex`
const animations   = `${mc}/animations`
const projectFile  = `${mc}/project.ts`
const shapes       = `${mc}/shapesV3`
const shapeConfigs = `${server}/builder/shape-configs`
const images       = `${server}/images`
const inputImages  = `${images}/input`
const outputImages = `${images}/output`
const paddedImages = `${images}/padded`

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// computed constants
export const sceneFile    = (fileName: string) => `${scenes}/${fileName}.tsx`
export const latexFile    = (fileName: string) => `${latex}/${fileName}.json`
export const plotFile     = (fileName: string) => `${plots}/${fileName}.json`
export const previewScene = (plugin: string)   => `${scenes}/preview/${plugin}.tsx`
export const previewFile  = ()   => `${scenes}/preview/json/animation.json`
export const dataPath     = (dataType: string) => `${server}/data/${dataType}`

export const paths = {
  sceneFile,
  latexFile,
  latexDir: path.resolve(__dirname, 'motion-canvas/src/latex/'),
  plotFile,
  plugins,
  pluginComponent: path.resolve(__dirname, `frontend/plugins/`),
  main: path.resolve(__dirname, `frontend/src/main.tsx`),
  endpoints,
  projectFile,
  scenes,
  plots,
  latex,
  animations,
  previewFile,
  previewScene,
  shapes,
  shapeConfigs,
  server,
  mc,
  images,
  inputImages,
  outputImages,
  paddedImages,
  dataPath,
}