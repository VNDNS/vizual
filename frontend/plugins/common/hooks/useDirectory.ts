import { getDirectory } from "../requests/get-directory"
import { useEffect, useState } from "react"

export const useDirectory = (directoryKey: string) => {
  const [files, setFiles] = useState([])

  useEffect(() => {
    const fetchFiles = async () => {
      const files_ = await getDirectory(directoryKey)
      setFiles(files_)
    }
    
    fetchFiles()
  }, [directoryKey])

  return { files }
}