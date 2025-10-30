import { useState, useEffect, useRef } from "react"
import { getDirectory } from "../frontend/plugins/common/requests/get-directory"
import { getJson } from "../frontend/plugins/common/requests/get-json"
import { useAnimation } from "../frontend/plugins/animation/context"

// TODO: Replace flowChart with fileType when expanding to other file types

export const DataFileSelection = () => {

  const { setCurrentDataFile, currentDataFile, setCurrentData, fileType } = useAnimation()

  const [dataFiles, setDataFiles] = useState<string[]>([])
  const isFirstRender = useRef(true)

  useEffect(() => {
    console.log('set current data hook 1')
    if (fileType === 'flowChart') {
    getDirectory('flowChart').then(dataFiles => {
      setDataFiles(dataFiles)
      if (dataFiles.length > 0 && !currentDataFile) {
          setCurrentDataFile(dataFiles[0])
        }
      })
    }
  }, [])

  useEffect(() => {
    console.log('set current data hook 2')
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    
    if (currentDataFile) {
      console.log('currentDataFile', currentDataFile)
      const fullPath = 'server/data/' + 'flowChart' + '/' + currentDataFile
      getJson(fullPath).then(data => {
        setCurrentData(data)
      })
    }
  }, [currentDataFile])

  return (
    <select className="data-file-selection" value={currentDataFile} onChange={(e) => setCurrentDataFile(e.target.value)}>
      {dataFiles.map((file: string) => <option key={file} value={file}>{file}</option>)}
    </select>
  )
}
