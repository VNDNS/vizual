import { useAnimation } from "@context/context"
import { saveJson } from "../../../common/requests/save-json"

export const ExportScene = () => {

  const { fileName, setFileName, animation, components, panelData, audioClips } = useAnimation()

  const exportScene = (fileName: string) => {

    console.log(animation)
    const fullPath = '/home/viktor/code/vizual/motion-canvas/src/animations/' + fileName + '.json'
    const scene = { components: components, animation, tracks: 1, panel:panelData, audio: audioClips}
    saveJson(scene, fullPath);
  }

  return (
    <div className="export-scene">
      <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />
      <button onClick={() => exportScene(fileName)}>Export</button>
    </div>
  )
}