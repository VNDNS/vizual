import { useEffect } from "react"
import { useGlobal } from "../frontend/plugins/common/context"
import { useDirectory } from "../frontend/plugins/common/hooks/useDirectory"
import { saveJson } from "../frontend/plugins/common/requests/save-json"

export const FileView = (props: {fileType: string, path: string}) => {

  // state
  const { selectedFile, setSelectedFile, fileName, setFileName, currentObject } = useGlobal()
  
  // hooks
  const { files } = useDirectory(props.fileType)

  // effects
  useEffect(() => {
    setFileName(props.fileType + files.length)
  }, [files, props.fileType])

  // computed
  const filePath = props.path + fileName + '.json'

  return (
    <>
      <div className="file-view">
        <select className="file-view-select" value={selectedFile || ''} onChange={(e) => setSelectedFile(e.currentTarget.value)}>
          <option value="" disabled>Select a file</option>
          {files.map((file, index) => (
            <option key={index} value={file}>{file}</option>
          ))}
        </select>
      </div>
      <div className="file-view-export">
        <input className="file-view-export-input" type="text" value={fileName} onChange={(e) => setFileName(e.currentTarget.value)} />
        <button className="file-view-export-button" onClick={() => {saveJson(currentObject, filePath)}}>export</button>
      </div>
    </>
  )
}