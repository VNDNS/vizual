import { AnimationUI } from "./AnimationUI"
import { ComponentUI } from "./ComponentUI"
import { MutableRefObject } from "react"

export interface CameraState {
  x: number
  y: number
  zoom: number
  width: number
  height: number
}

export interface LastCameraState {
  x: number
  y: number
  zoom: number
  width: number
  height: number
}

export interface SelectionBox {
  topLeft: { x: number; y: number }
  bottomRight: { x: number; y: number }
}

export interface AnimationContextType {
  fileType: string
  setFileType: (fileType: string) => void
  selectedFile: string
  setSelectedFile: (file: string) => void
  currentDataFile: string
  setCurrentDataFile: (file: string) => void
  components: ComponentUI[]
  setComponents: (components: ComponentUI[] | ((prev: ComponentUI[]) => ComponentUI[])) => void
  cameraIsSelected: boolean
  setCameraIsSelected: (selected: boolean) => void
  camera: CameraState
  setCamera: (camera: CameraState) => void
  lastCamera: LastCameraState
  setLastCamera: (camera: LastCameraState) => void
  lastContainer: any
  setLastContainer: (container: any) => void
  selectedComponent: string | null
  setSelectedComponent: (id: string | null) => void
  animation: AnimationUI[]
  setAnimation: (animation: AnimationUI[]) => void
  selectedMethod: AnimationUI | null
  setSelectedMethod: (method: AnimationUI | null) => void
  selectedTimeline: number
  setSelectedTimeline: (timeline: number) => void
  showTimeline: boolean
  setShowTimeline: (show: boolean) => void
  showSidebar: boolean
  setShowSidebar: (show: boolean) => void
  showCameraPath: boolean
  setShowCameraPath: (show: boolean) => void
  showCamera: boolean
  setShowCamera: (show: boolean) => void
  showPanelConfiguration: boolean
  setShowPanelConfiguration: (show: boolean) => void
  showBackgroundConfiguration: boolean
  setShowBackgroundConfiguration: (show: boolean) => void
  showJointConfiguration: boolean
  setShowJointConfiguration: (show: boolean) => void
  drawingBackground: boolean
  setDrawingBackground: (drawing: boolean) => void
  frame: number
  setFrame: (frame: number) => void
  zoom: number
  setZoom: (zoom: number) => void
  timelineScale: number
  setTimelineScale: (scale: number) => void
  timelineScrollX: number
  setTimelineScrollX: (scroll: number) => void
  numTimelines: number
  setNumTimelines: (num: number) => void
  mode: string
  setMode: (mode: string) => void
  origin: { dx: number; dy: number }
  setOrigin: any//(origin: { dx: number; dy: number }) => void
  currentData: { nodes: unknown[]; edges: unknown[] }
  setCurrentData: (data: { nodes: unknown[]; edges: unknown[] }) => void
  saveState: () => void
  loadState: () => void
  resetState: () => void
  isDraggingRef: MutableRefObject<boolean>
  selectedNode: number | null
  setSelectedNode: (id: number | null) => void
  selectedNodes: number[]
  setSelectedNodes: (ids: number[]) => void
  tableOfContents: unknown[]
  setTableOfContents: (toc: unknown[]) => void
  description: string
  setDescription: (desc: string) => void
  nodeDescription: string
  setNodeDescription: (desc: string) => void
  languageModel: string
  setLanguageModel: (model: string) => void
  summary: string
  setSummary: (summary: string) => void
  sections: string[]
  setSections: (sections: string[]) => void
  sectionIndex: number
  setSectionIndex: (index: number) => void
  imageModel: string
  setImageModel: (model: string) => void
  imageBase64: string | null
  setImageBase64: (image: string | null) => void
  selectedInputImage: string | null
  setSelectedInputImage: (image: string | null) => void
  outputImageBase64: string | null
  setOutputImageBase64: (image: string | null) => void
  selectedEdge: string | null
  setSelectedEdge: (id: string | null) => void
  selectedJoint: string | null
  setSelectedJoint: (id: string | null) => void
  fetchedImages: string[] | null
  setFetchedImages: (images: string[] | null) => void
  selectedImage: string | null
  setSelectedImage: (image: string | null) => void
  selectedDataFile: string | null
  setSelectedDataFile: (file: string | null) => void
  croppedImage: string | null
  setCroppedImage: (image: string | null) => void
  items: unknown[] | null
  setItems: (items: unknown[] | null) => void
  selectedItem: unknown | null
  setSelectedItem: (item: unknown | null) => void
  selectedItems: any[]
  setSelectedItems: (items: any[]) => void
  selectedTimelineItems: string[]
  setSelectedTimelineItems: (items: string[]) => void
  outputImages: string[]
  setOutputImages: (images: string[]) => void
  selection: SelectionBox | null
  setSelection: (selection: SelectionBox | null) => void
  panelData: unknown[]
  setPanelData: (data: unknown[]) => void
  background: { points: unknown[] }
  setBackground: (background: { points: unknown[] }) => void
  selectedBackgroundNodes: unknown[]
  setSelectedBackgroundNodes: (nodes: unknown[]) => void
  audioClips: AnimationUI[]
  setAudioClips: (clips: AnimationUI[]) => void
  fileName: string
  setFileName: (name: string) => void
  sidebar: string | null
  setSidebar: (sidebar: string | null) => void
  sidebarMode: string
  setSidebarMode: (mode: string) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  draggingStart: { x: number; y: number } | null
  setDraggingStart: (start: { x: number; y: number } | null) => void
  draggingCurrent: { x: number; y: number } | null
  setDraggingCurrent: (current: { x: number; y: number } | null) => void
  draggingDelta: { x: number; y: number }
  setDraggingDelta: (delta: { x: number; y: number }) => void
  lastPosition: { x: number; y: number } | null
  setLastPosition: (position: { x: number; y: number } | null) => void
  lastCameraPosition: { x: number; y: number }
  setLastCameraPosition: (position: { x: number; y: number }) => void
  draggingElement: string | null
  setDraggingElement: (element: string | null) => void
  debug: boolean
  setDebug: (debug: boolean) => void
  selectedVideo: string | null
  setSelectedVideo: (video: string | null) => void
  videoPlaybackPosition: number
  setVideoPlaybackPosition: (position: number) => void
  videoIsProcessing: boolean
  setVideoIsProcessing: (isProcessing: boolean) => void
  videoProcessingResult: any
  setVideoProcessingResult: (result: any) => void
  videoProcessingError: string | null
  setVideoProcessingError: (error: string | null) => void
  selectedVideoSchema: string
  setSelectedVideoSchema: (schema: string) => void
  videoSnapshotInterval: number
  setVideoSnapshotInterval: (interval: number) => void
  videoAnalysisData: any
  setVideoAnalysisData: (data: any) => void
}

