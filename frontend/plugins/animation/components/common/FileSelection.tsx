import { useState, useEffect, useRef } from "react"
import { getDirectory } from "../../../common/requests/get-directory"
import { getJson } from "../../../common/requests/get-json"
import { useAnimation } from "../../context"

interface FileSelectionProps {
  directory: string
  onDataChange: (data: any) => void
}


export const FileSelection = ({ onDataChange, directory }: FileSelectionProps) => {

  const { setCurrentDataFile, currentDataFile } = useAnimation()

  const [dataFiles, setDataFiles] = useState<string[]>([])

  useEffect(() => {

    getDirectory(directory).then(dataFiles => {
      setDataFiles(dataFiles)
      if (dataFiles.length > 0 && !currentDataFile) {
        setCurrentDataFile(dataFiles[0])
      }
    })
  }, [])

  const isFirstRender = useRef(true)

  useEffect(() => {
    console.log('currentDataFile', currentDataFile, isFirstRender.current)
    // if (isFirstRender.current) {
    //   isFirstRender.current = false
    //   return
    // }
    if (!!currentDataFile) {
      console.log('hello', currentDataFile)
      const fullPath = 'server/data/' + directory + '/' + currentDataFile
      console.log('fullPath', fullPath)
      getJson(fullPath).then(data => {
        onDataChange(data)
      })
    }
  }, [currentDataFile])

  return (
    <div className="component-configuration-signal">
      <span>Data</span>
      <select value={currentDataFile} onChange={(e) => setCurrentDataFile(e.target.value)}>
        {dataFiles.map((file: string) => <option key={file} value={file}>{file}</option>)}
      </select>
    </div>
  )
}
