import { useEffect } from "react"

const STORAGE_KEY = 'animation-state';

export const usePersistence = (state: any) => {
  const saveState = () => {
    try {
      const stateToSave = {
        fileType: state.fileType,
        selectedFile: state.selectedFile,
        currentDataFile: state.currentDataFile,
        currentData: state.currentData,
        components: state.components,
        cameraIsSelected: state.cameraIsSelected,
        camera: state.camera,
        lastCamera: state.lastCamera,
        lastContainer: state.lastContainer,
        selectedComponent: state.selectedComponent,
        animation: state.animation,
        selectedMethod: state.selectedMethod,
        selectedTimeline: state.selectedTimeline,
        showTimeline: state.showTimeline,
        showSidebar: state.showSidebar,
        showCameraPath: state.showCameraPath,
        showCamera: state.showCamera,
        showPanelConfiguration: state.showPanelConfiguration,
        showBackgroundConfiguration: state.showBackgroundConfiguration,
        showJointConfiguration: state.showJointConfiguration,
        drawingBackground: state.drawingBackground,
        frame: state.frame,
        zoom: state.zoom,
        timelineScale: state.timelineScale,
        timelineScrollX: state.timelineScrollX,
        numTimelines: state.numTimelines,
        mode: state.mode,
        origin: state.origin,
        selectedNode: state.selectedNode,
        selectedNodes: state.selectedNodes,
        tableOfContents: state.tableOfContents,
        description: state.description,
        nodeDescription: state.nodeDescription,
        languageModel: state.languageModel,
        summary: state.summary,
        sections: state.sections,
        sectionIndex: state.sectionIndex,
        imageModel: state.imageModel,
        imageBase64: state.imageBase64,
        selectedInputImage: state.selectedInputImage,
        outputImageBase64: state.outputImageBase64,
        selectedEdge: state.selectedEdge,
        selectedJoint: state.selectedJoint,
        fetchedImages: state.fetchedImages,
        selectedImage: state.selectedImage,
        selectedDataFile: state.selectedDataFile,
        croppedImage: state.croppedImage,
        items: state.items,
        selectedItem: state.selectedItem,
        selectedItems: state.selectedItems,
        outputImages: state.outputImages,
        selection: state.selection,
        panelData: state.panelData,
        background: state.background,
        selectedBackgroundNodes: state.selectedBackgroundNodes,
        audioClips: state.audioClips,
        fileName: state.fileName,
        sidebar: state.sidebar,
        sidebarMode: state.sidebarMode,
        searchTerm: state.searchTerm,
        draggingDelta: state.draggingDelta,
        lastCameraPosition: state.lastCameraPosition,
        selectedVideo: state.selectedVideo,
        videoPlaybackPosition: state.videoPlaybackPosition,
        videoIsProcessing: state.videoIsProcessing,
        videoProcessingResult: state.videoProcessingResult,
        videoProcessingError: state.videoProcessingError,
        selectedVideoSchema: state.selectedVideoSchema,
        videoSnapshotInterval: state.videoSnapshotInterval,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Failed to save animation state:', error);
    }
  };
  
  const loadState = () => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        
        state.setFileType(parsedState.fileType || 'barChart');
        state.setSelectedFile(parsedState.selectedFile || '');
        state.setCurrentDataFile(parsedState.currentDataFile || '');
        state.setCurrentData(parsedState.currentData || {nodes: [], edges: []});
        state.setComponents(parsedState.components || []);
        state.setCameraIsSelected(parsedState.cameraIsSelected || false);
        state.setCamera(parsedState.camera || {x: 0, y: 0, width: 1920, height: 1080, zoom: 1});
        state.setLastCamera(parsedState.lastCamera || {x: 0, y: 0, zoom: 1, width: 1920, height: 1080});
        state.setLastContainer(parsedState.lastContainer || null);
        state.setSelectedComponent(parsedState.selectedComponent || null);
        state.setAnimation(parsedState.animation || []);
        state.setSelectedMethod(parsedState.selectedMethod || null);
        state.setSelectedTimeline(parsedState.selectedTimeline || 0);
        state.setShowTimeline(parsedState.showTimeline !== undefined ? parsedState.showTimeline : true);
        state.setShowSidebar(parsedState.showSidebar !== undefined ? parsedState.showSidebar : false);
        state.setShowCameraPath(parsedState.showCameraPath !== undefined ? parsedState.showCameraPath : false);
        state.setShowCamera(parsedState.showCamera !== undefined ? parsedState.showCamera : true);
        state.setShowPanelConfiguration(parsedState.showPanelConfiguration !== undefined ? parsedState.showPanelConfiguration : false);
        state.setShowBackgroundConfiguration(parsedState.showBackgroundConfiguration !== undefined ? parsedState.showBackgroundConfiguration : false);
        state.setShowJointConfiguration(parsedState.showJointConfiguration !== undefined ? parsedState.showJointConfiguration : false);
        state.setDrawingBackground(parsedState.drawingBackground !== undefined ? parsedState.drawingBackground : false);
        state.setFrame(parsedState.frame || 0);
        state.setZoom(parsedState.zoom || 1);
        state.setTimelineScale(parsedState.timelineScale || 1);
        state.setTimelineScrollX(parsedState.timelineScrollX || 0);
        state.setNumTimelines(parsedState.numTimelines || 2);
        state.setMode(parsedState.mode || 'animation');
        state.setOrigin(parsedState.origin || { dx: 0, dy: 0 });
        state.setSelectedNode(parsedState.selectedNode || null);
        state.setSelectedNodes(parsedState.selectedNodes || []);
        state.setTableOfContents(parsedState.tableOfContents || []);
        state.setDescription(parsedState.description || 'Evolution of language. 3 sections. 2 subsections per section. 2 subsubsections per subsection.');
        state.setNodeDescription(parsedState.nodeDescription || '');
        state.setLanguageModel(parsedState.languageModel || 'gpt-5-nano');
        state.setSummary(parsedState.summary || '');
        state.setSections(parsedState.sections || Array(30).fill(''));
        state.setSectionIndex(parsedState.sectionIndex || 0);
        state.setImageModel(parsedState.imageModel || 'gpt-image-1');
        state.setImageBase64(parsedState.imageBase64 || null);
        state.setSelectedInputImage(parsedState.selectedInputImage || null);
        state.setOutputImageBase64(parsedState.outputImageBase64 || null);
        state.setSelectedEdge(parsedState.selectedEdge || null);
        state.setSelectedJoint(parsedState.selectedJoint || null);
        state.setFetchedImages(parsedState.fetchedImages || null);
        state.setSelectedImage(parsedState.selectedImage || null);
        state.setSelectedDataFile(parsedState.selectedDataFile || null);
        state.setCroppedImage(parsedState.croppedImage || null);
        state.setItems(parsedState.items || null);
        state.setSelectedItem(parsedState.selectedItem || null);
        state.setSelectedItems(parsedState.selectedItems || []);
        state.setOutputImages(parsedState.outputImages || []);
        state.setSelection(parsedState.selection || null);
        state.setPanelData(parsedState.panelData || []);
        state.setBackground(parsedState.background || {points: []});
        state.setSelectedBackgroundNodes(parsedState.selectedBackgroundNodes || []);
        state.setAudioClips(parsedState.audioClips || []);
        state.setFileName(parsedState.fileName || '');
        state.setSidebar(parsedState.sidebar || null);
        state.setSidebarMode(parsedState.sidebarMode || 'animation-configuration');
        state.setSearchTerm(parsedState.searchTerm || '');
        state.setDraggingDelta(parsedState.draggingDelta || { x: 0, y: 0 });
        state.setLastCameraPosition(parsedState.lastCameraPosition || { x: 0, y: 0 });
        state.setSelectedVideo(parsedState.selectedVideo || null);
        state.setVideoPlaybackPosition(parsedState.videoPlaybackPosition || 0);
        state.setVideoIsProcessing(parsedState.videoIsProcessing || false);
        state.setVideoProcessingResult(parsedState.videoProcessingResult || null);
        state.setVideoProcessingError(parsedState.videoProcessingError || null);
        state.setSelectedVideoSchema(parsedState.selectedVideoSchema || 'analysis');
        state.setVideoSnapshotInterval(parsedState.videoSnapshotInterval || 5);
      }
    } catch (error) {
      console.error('Failed to load animation state:', error);
    }
  };

  const resetState = () => {
    state.setFileType('barChart');
    state.setSelectedFile('');
    state.setCurrentDataFile('');
    state.setCurrentData({nodes: [], edges: []});
    state.setComponents([]);
    state.setCameraIsSelected(false);
    state.setLastContainer(null);
    state.setSelectedComponent(null);
    state.setAnimation([]);
    state.setSelectedMethod(null);
    state.setSelectedTimeline(0);
    state.setShowCamera(true);
    state.setShowPanelConfiguration(false);
    state.setShowBackgroundConfiguration(false);
    state.setShowJointConfiguration(false);
    state.setDrawingBackground(false);
    state.setFrame(0);
    state.setTimelineScale(1);
    state.setTimelineScrollX(0);
    state.setNumTimelines(2);
    state.setSelectedNode(null);
    state.setSelectedNodes([]);
    state.setTableOfContents([]);
    state.setDescription('Evolution of language. 3 sections. 2 subsections per section. 2 subsubsections per subsection.');
    state.setNodeDescription('');
    state.setLanguageModel('gpt-5-nano');
    state.setSummary('');
    state.setSections(Array(30).fill(''));
    state.setSectionIndex(0);
    state.setImageModel('');
    state.setImageBase64(null);
    state.setSelectedInputImage(null);
    state.setOutputImageBase64(null);
    state.setSelectedEdge(null);
    state.setSelectedJoint(null);
    state.setFetchedImages(null);
    state.setSelectedImage(null);
    state.setSelectedDataFile(null);
    state.setCroppedImage(null);
    state.setItems(null);
    state.setSelectedItem(null);
    state.setSelectedItems([]);
    state.setOutputImages([]);
    state.setSelection(null);
    state.setPanelData([]);
    state.setBackground({points: []});
    state.setSelectedBackgroundNodes([]);
    state.setAudioClips([]);
    state.setFileName('');
    state.setSearchTerm('');
    state.setDraggingDelta({ x: 0, y: 0 });
    state.setLastCameraPosition({ x: 0, y: 0 });
    state.setSelectedVideo(null);
    state.setVideoPlaybackPosition(0);
    state.setVideoIsProcessing(false);
    state.setVideoProcessingResult(null);
    state.setVideoProcessingError(null);
    state.setSelectedVideoSchema('analysis');
    state.setVideoSnapshotInterval(5);
    localStorage.removeItem(STORAGE_KEY);
  };

  useEffect(() => {
    if (!state.initialLoadDone.current) {
      loadState();
      state.initialLoadDone.current = true;
    }
  }, []);
  
  useEffect(() => {
    const saveInterval = setInterval(() => {
      saveState();
    }, 1000);
    
    return () => clearInterval(saveInterval);
  }, [
    state.fileType, state.selectedFile, state.currentDataFile, state.currentData, state.components, state.cameraIsSelected, state.camera, state.lastContainer, state.selectedComponent,
    state.animation, state.selectedMethod, state.selectedTimeline, state.showTimeline, state.showSidebar, state.showCameraPath, state.showCamera, state.showPanelConfiguration, state.showBackgroundConfiguration, state.showJointConfiguration, state.drawingBackground, state.frame, state.zoom, state.timelineScale,
    state.timelineScrollX, state.numTimelines, state.mode, state.origin, state.selectedNode, state.selectedNodes, state.tableOfContents,
    state.description, state.nodeDescription, state.languageModel, state.summary, state.sections, state.sectionIndex, state.imageModel,
    state.imageBase64, state.selectedInputImage, state.selectedEdge, state.selectedJoint, state.fetchedImages, state.selectedImage, state.selectedDataFile,
    state.croppedImage, state.items, state.selectedItem, state.selectedItems, state.outputImages, state.selection, state.panelData, state.background, state.selectedBackgroundNodes, state.audioClips, state.fileName, state.sidebar, state.sidebarMode, state.searchTerm, state.draggingDelta, state.lastCameraPosition, state.selectedVideo, state.videoPlaybackPosition, state.videoIsProcessing, state.videoProcessingResult, state.videoProcessingError, state.selectedVideoSchema, state.videoSnapshotInterval,
  ]);

  return {
    saveState,
    loadState,
    resetState,
  };
}

