import { useAnimation } from "@context/context"
import { saveJson } from "../../../common/requests/save-json"

export const ExportScene = () => {

  const { fileName, setFileName, animation, components, panelData, audioClips, cameraInitialState } = useAnimation()

  const exportScene = (fileName: string) => {

    const fullPath = 'motion-canvas/src/animations/' + fileName + '.json'
    const scene = { components: components, animation, tracks: 1, panel:panelData, audio: audioClips, cameraInitialState}
    saveJson(scene, fullPath);
  }

  return (
    <div className="export-scene">
      <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />
      <button onClick={() => exportScene(fileName)}>Export</button>
    </div>
  )
}