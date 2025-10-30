import path from 'path'
import { fileURLToPath } from 'url'

export const sceneName = 'example'
export const port      = 3009

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root         = path.resolve(__dirname, '..')
const mc           = path.resolve(root, 'motion-canvas/src')
const server       = path.resolve(root, 'server')
const frontend     = path.resolve(root, 'frontend')
const endpoints    = path.resolve(server, 'endpoints')
const plugins      = path.resolve(frontend, 'plugins')
const scenes       = path.resolve(mc, 'scenes')
const plots        = path.resolve(mc, 'plots')
const latex        = path.resolve(mc, 'latex')
const animations   = path.resolve(mc, 'animations')
const projectFile  = path.resolve(mc, 'project.ts')
const shapes       = path.resolve(mc, 'shapesV3')
const shapeConfigs = path.resolve(server, 'builder/shape-configs')
const images       = path.resolve(server, 'images')
const inputImages  = path.resolve(images, 'input')
const outputImages = path.resolve(images, 'output')
const paddedImages = path.resolve(images, 'padded')

// computed constants
export const sceneFile    = (fileName: string) => path.resolve(scenes, `${fileName}.tsx`)
export const latexFile    = (fileName: string) => path.resolve(latex, `${fileName}.json`)
export const plotFile     = (fileName: string) => path.resolve(plots, `${fileName}.json`)
export const previewScene = (plugin: string)   => path.resolve(scenes, 'preview', `${plugin}.tsx`)
export const previewFile  = ()   => path.resolve(scenes, 'preview/json/animation.json')
export const dataPath     = (dataType: string) => path.resolve(server, 'data', dataType)

export const paths = {
  root,
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