import { createContext, useState, useContext, useEffect } from "react"
import { setScene } from "./requests/set-scene"
import { setPreview } from "./requests/set-preview"

const GlobalContext = createContext<{
  selectedFile: string
  setSelectedFile: (selectedFile: string) => void
  fileName: string
  setFileName: (fileName: string) => void
  currentObject: any
  setCurrentObject: (currentObject: any) => void
  currentPlugin: string
  setCurrentPlugin: (currentPlugin: string) => void
} | null>(null)

const Provider = GlobalContext.Provider

export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedFile, setSelectedFile]           = useState<string>('')
  const [fileName, setFileName]                   = useState<string>('')
  const [currentObject, setCurrentObject]         = useState<any>({})
  const [currentPlugin, setCurrentPlugin]         = useState<string>('')

  useEffect(() => {
    setSelectedFile('')
    if(currentPlugin) {
      setScene(currentPlugin)
    }
  }, [currentPlugin])

  // useEffect(() => {
  //   setPreview(currentPlugin, currentObject)
  // }, [currentObject])

  const value = {
    selectedFile,
    setSelectedFile,
    fileName,
    setFileName,
    currentPlugin,
    setCurrentPlugin,
    currentObject,
    setCurrentObject
  }

  return (
    <Provider value={value}>
      {children}
    </Provider>
  )
}

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalStateProvider');
  }
  return context;
}