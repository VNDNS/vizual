import { ExportToCurrentDataButton } from '../../common/components/ExportToCurrentDataButton';
import { useSetCurrentPlugin } from '../../common/hooks/useSetCurrentPlugin';
import { Screen } from '../components/arrangement/Screen';
import { ModeSelection } from '../components/common/ModeSelection';
import { ResetButton } from '../components/common/ResetButton';
import { NodeConfiguration } from '../components/arrangement/NodeConfiguration';
import { useAnimation } from '../context';
import { ArrangeRadiallyButton } from '../components/arrangement/ArrangeRadiallyButton';
import { Components } from '../components/common/Components';
import { EdgeConfiguration } from '../components/arrangement/EdgeConfiguration';
import { CameraConfiguration } from '@context/components/arrangement/CameraConfiguration';
import { TimelineContainer } from '@context/components/arrangement/TimelineContainer';
import { ComponentSelection } from '@context/components/animation/ComponentSelection';
import { AnimationConfiguration } from '@context/components/arrangement/AnimationConfiguration';
import { Switch } from '../../common/components/Switch';
import { useAnimationHooks } from '@context/hooks/useAnimationHooks';
import { PanelConfiguration } from '@context/components/arrangement/PanelConfiguration';
import { BackgroundConfiguration } from '@context/components/arrangement/BackgroundConfiguration';
import { processAudio } from '../requests/processAudio';
import { JointConfiguration } from '@context/components/arrangement/JointConfiguration';
import { FileDisplay } from '../../common/components/FileDisplay';
import { useState } from 'react';
import { ExportScene } from '../components/arrangement/ExportScene';
import { getJson } from '../../common/requests/get-json';
import { ArrangeHorizontallyButton } from '@context/components/arrangement/ArrangeHorizontallyButton';
import { pages } from '@context/constants';
import { Sidebar } from '@context/components/arrangement/Sidebar';

export const ArrangementLayout = () => {

  const { selectedNode, selectedEdge, cameraIsSelected, showTimeline, selectedComponent, selectedMethod, showCameraPath, setShowCameraPath, showPanelConfiguration, setShowPanelConfiguration, setSelectedComponent, setSelectedNode, setSelectedEdge, setSelectedMethod, showBackgroundConfiguration, setShowBackgroundConfiguration, audioClips, showJointConfiguration, setShowJointConfiguration, setComponents, setAnimation, setPanelData, setAudioClips, setShowTimeline, mode, setMode, showSidebar, setShowSidebar, showCamera, setShowCamera, debug, setDebug  } = useAnimation()
  const { getSelectedComponent } = useAnimationHooks()

  const component = getSelectedComponent()

  useSetCurrentPlugin('arrangement');

  const handleShowPanelConfiguration = () => {
    setSelectedComponent(null)
    setSelectedNode(null)
    setSelectedEdge(null)
    setSelectedMethod(null)
    setShowPanelConfiguration(!showPanelConfiguration)
  }

  const handleShowBackgroundConfiguration = () => {
    setSelectedComponent(null)
    setSelectedNode(null)
    setSelectedEdge(null)
    setSelectedMethod(null)
    setShowBackgroundConfiguration(!showBackgroundConfiguration)
  }

  const [sceneFile, setSceneFile] = useState<string>('')

  const onSelectSceneFile = (file: string) => {
    const fullPath = '/home/viktor/code/vizual/motion-canvas/src/animations/' + file
    getJson(fullPath).then(data => {
      setComponents(data.components)
      setAnimation(data.animation)
      setPanelData(data.panel)
      setAudioClips(data.audio)
    })

    setSceneFile(file)
  }

  return (
    <div className="animation plugin">
      <div className="configuration">
        <ModeSelection options={pages} setMode={setMode} mode={mode} />
        <ResetButton />
        <ExportScene />
        <ComponentSelection />
        <Components />
        <FileDisplay directoryKey="animation" state={sceneFile} setState={onSelectSceneFile} />
        <ArrangeHorizontallyButton />
        <button onClick={() =>processAudio(audioClips)}>Update Audio</button>
        <Switch value={showTimeline} setValue={setShowTimeline} text="Show Timeline" />
        <Switch value={showCameraPath} setValue={setShowCameraPath} text="Show Camera Path" />
        <Switch value={showSidebar} setValue={setShowSidebar} text="Show Sidebar" />
        <Switch value={showCamera} setValue={setShowCamera} text="Show Camera" />
        <Switch value={debug} setValue={setDebug} text="Debug" />
      </div>
      <div className="main">
        <Screen />
        {showSidebar && <Sidebar />}
        {showTimeline && <TimelineContainer />}
      </div>
    </div>
  );
};
