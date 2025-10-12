import { useState, useRef } from "react"
import { LastCameraState } from "../../../../types/AnimationContextType"

export const useAnimationState = () => {
  const [mode, setMode] = useState<string>('arrangement')
  const [fileType, setFileType] = useState('barChart')
  const [animation, setAnimation] = useState<any[]>([])
  const [components, setComponents] = useState<any[]>([])
  const [cameraIsSelected, setCameraIsSelected] = useState<boolean>(false)
  const [camera, setCamera] = useState<{x: number, y: number, zoom: number, width: number, height: number}>({x: 0, y: 0, zoom: 1, width: 1920, height: 1080})
  const [lastCamera, setLastCamera] = useState<LastCameraState>({x: 0, y: 0, zoom: 1, width: 1920, height: 1080})
  const [lastContainer, setLastContainer] = useState<any>(null)
  const [selectedFile, setSelectedFile] = useState('')
  const [currentDataFile, setCurrentDataFile] = useState<string>('')
  const [currentData, setCurrentData] = useState<{nodes: unknown[], edges: unknown[]}>({nodes: [], edges: []})
  const [numTimelines, setNumTimelines] = useState<number>(2)
  const [timelineScale, setTimelineScale] = useState<number>(1)
  const [zoom, setZoom] = useState<number>(1)
  const [selectedMethod, setSelectedMethod] = useState<any | null>(null)
  const [timelineScrollX, setTimelineScrollX] = useState<number>(0)
  const [selectedTimeline, setSelectedTimeline] = useState<number>(0)
  const [showTimeline, setShowTimeline] = useState<boolean>(true)
  const [showSidebar, setShowSidebar] = useState<boolean>(false)
  const [showCameraPath, setShowCameraPath] = useState<boolean>(false)
  const [showCamera, setShowCamera] = useState<boolean>(true)
  const [showPanelConfiguration, setShowPanelConfiguration] = useState<boolean>(false)
  const [showBackgroundConfiguration, setShowBackgroundConfiguration] = useState<boolean>(false)
  const [showJointConfiguration, setShowJointConfiguration] = useState<boolean>(false)
  const [drawingBackground, setDrawingBackground] = useState<boolean>(false)
  const [frame, setFrame] = useState<number>(0)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [origin, setOrigin] = useState({ dx: 0, dy: 0 })
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null)
  const [selectedJoint, setSelectedJoint] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  const [selectedNodes, setSelectedNodes] = useState<number[]>([])
  const [tableOfContents, setTableOfContents] = useState<unknown[]>([])
  const [description, setDescription] = useState<string>('Evolution of language. 3 sections. 2 subsections per section. 2 subsubsections per subsection.')
  const [nodeDescription, setNodeDescription] = useState<string>('')
  const [languageModel, setLanguageModel] = useState<string>('gpt-5-nano')
  const [summary, setSummary] = useState<string>('')
  const [sections, setSections] = useState<string[]>(Array(30).fill(''))
  const [sectionIndex, setSectionIndex] = useState<number>(0)
  const [imageModel, setImageModel] = useState<string>('')
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [selectedInputImage, setSelectedInputImage] = useState<string | null>(null)
  const [outputImageBase64, setOutputImageBase64] = useState<string | null>(null)
  const [fetchedImages, setFetchedImages] = useState<string[] | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedDataFile, setSelectedDataFile] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [items, setItems] = useState<unknown[] | null>(null)
  const [selectedItem, setSelectedItem] = useState<unknown | null>(null)
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const [selectedTimelineItems, setSelectedTimelineItems] = useState<string[]>([])
  const [outputImages, setOutputImages] = useState<string[]>([])
  const [selection, setSelection] = useState<{topLeft: { x: number; y: number }, bottomRight: { x: number; y: number }} | null>(null)
  const [panelData, setPanelData] = useState<unknown[]>([])
  const [background, setBackground] = useState<{points: unknown[]}>({points: []})
  const [selectedBackgroundNodes, setSelectedBackgroundNodes] = useState<unknown[]>([])
  const [audioClips, setAudioClips] = useState<any[]>([])
  const [fileName, setFileName] = useState<string>('')
  const [sidebar, setSidebar] = useState<string | null>(null)
  const [sidebarMode, setSidebarMode] = useState<string>('animation-configuration')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const initialLoadDone = useRef(false);
  const isDraggingRef = useRef<boolean>(false);
  const [draggingStart, setDraggingStart] = useState<{x: number, y: number} | null>(null);
  const [draggingCurrent, setDraggingCurrent] = useState<{x: number, y: number} | null>(null);
  const [draggingDelta, setDraggingDelta] = useState<{x: number, y: number}>({x: 0, y: 0});
  const [lastPosition, setLastPosition] = useState<{x: number, y: number} | null>(null);
  const [lastCameraPosition, setLastCameraPosition] = useState<{x: number, y: number}>({x: 0, y: 0});
  const [draggingElement, setDraggingElement] = useState<string | null>(null);
  const [debug, setDebug] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoPlaybackPosition, setVideoPlaybackPosition] = useState<number>(0);
  const [videoIsProcessing, setVideoIsProcessing] = useState<boolean>(false);
  const [videoProcessingResult, setVideoProcessingResult] = useState<any>(null);
  const [videoProcessingError, setVideoProcessingError] = useState<string | null>(null);
  const [selectedVideoSchema, setSelectedVideoSchema] = useState<string>('analysis');
  const [videoSnapshotInterval, setVideoSnapshotInterval] = useState<number>(5);
  const [videoAnalysisData, setVideoAnalysisData] = useState<any>(null);

  return {
    fileType, setFileType,
    selectedFile, setSelectedFile,
    currentDataFile, setCurrentDataFile,
    components, setComponents,
    cameraIsSelected, setCameraIsSelected,
    camera, setCamera,
    lastCamera, setLastCamera,
    lastContainer, setLastContainer,
    selectedComponent, setSelectedComponent,
    animation, setAnimation,
    selectedMethod, setSelectedMethod,
    selectedTimeline, setSelectedTimeline,
    showTimeline, setShowTimeline,
    showSidebar, setShowSidebar,
    showCameraPath, setShowCameraPath,
    showCamera, setShowCamera,
    showPanelConfiguration, setShowPanelConfiguration,
    showBackgroundConfiguration, setShowBackgroundConfiguration,
    showJointConfiguration, setShowJointConfiguration,
    drawingBackground, setDrawingBackground,
    frame, setFrame,
    zoom, setZoom,
    timelineScale, setTimelineScale,
    timelineScrollX, setTimelineScrollX,
    numTimelines, setNumTimelines,
    mode, setMode,
    origin, setOrigin,
    currentData, setCurrentData,
    isDraggingRef,
    selectedNode, setSelectedNode,
    selectedNodes, setSelectedNodes,
    tableOfContents, setTableOfContents,
    description, setDescription,
    nodeDescription, setNodeDescription,
    languageModel, setLanguageModel,
    summary, setSummary,
    sections, setSections,
    sectionIndex, setSectionIndex,
    imageModel, setImageModel,
    imageBase64, setImageBase64,
    selectedInputImage, setSelectedInputImage,
    outputImageBase64, setOutputImageBase64,
    selectedEdge, setSelectedEdge,
    selectedJoint, setSelectedJoint,
    fetchedImages, setFetchedImages,
    selectedImage, setSelectedImage,
    selectedDataFile, setSelectedDataFile,
    croppedImage, setCroppedImage,
    items, setItems,
    selectedItem, setSelectedItem,
    selectedItems, setSelectedItems,
    selectedTimelineItems, setSelectedTimelineItems,
    outputImages, setOutputImages,
    selection, setSelection,
    panelData, setPanelData,
    background, setBackground,
    selectedBackgroundNodes, setSelectedBackgroundNodes,
    audioClips, setAudioClips,
    fileName, setFileName,
    sidebar, setSidebar,
    sidebarMode, setSidebarMode,
    searchTerm, setSearchTerm,
    draggingStart, setDraggingStart,
    draggingCurrent, setDraggingCurrent,
    draggingDelta, setDraggingDelta,
    lastPosition, setLastPosition,
    lastCameraPosition, setLastCameraPosition,
    draggingElement, setDraggingElement,
    debug, setDebug,
    selectedVideo, setSelectedVideo,
    videoPlaybackPosition, setVideoPlaybackPosition,
    videoIsProcessing, setVideoIsProcessing,
    videoProcessingResult, setVideoProcessingResult,
    videoProcessingError, setVideoProcessingError,
    selectedVideoSchema, setSelectedVideoSchema,
    videoSnapshotInterval, setVideoSnapshotInterval,
    videoAnalysisData, setVideoAnalysisData,
    initialLoadDone,
  }
}

