import { useSetCurrentPlugin } from '../../common/hooks/useSetCurrentPlugin';
import { Screen } from '../components/arrangement/Screen';
import { ModeSelection } from '../components/common/ModeSelection';
import { ResetButton } from '../components/common/ResetButton';
import { useAnimation } from '../context';
import { Components } from '../components/common/Components';
import { TimelineContainer } from '@context/components/arrangement/TimelineContainer';
import { ComponentSelection } from '@context/components/animation/ComponentSelection';
import { Switch } from '../../common/components/Switch';
import { processAudio } from '../requests/processAudio';
import { FileDisplay } from '../../common/components/FileDisplay';
import { useState } from 'react';
import { ExportScene } from '../components/arrangement/ExportScene';
import { getJson } from '../../common/requests/get-json';
import { ArrangeHorizontallyButton } from '@context/components/arrangement/ArrangeHorizontallyButton';
import { pages } from '@context/constants';
import { Sidebar } from '@context/components/arrangement/Sidebar';

export const ArrangementLayout = () => {

  const { showTimeline, showCameraPath, setShowCameraPath, audioClips, setComponents, setAnimation, setPanelData, setAudioClips, setShowTimeline, mode, setMode, showSidebar, setShowSidebar, showCamera, setShowCamera, debug, setDebug  } = useAnimation()

  useSetCurrentPlugin('arrangement');

  const [sceneFile, setSceneFile] = useState<string>('')

  const onSelectSceneFile = (file: string) => {
    const fullPath = 'motion-canvas/src/animations/' + file
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
