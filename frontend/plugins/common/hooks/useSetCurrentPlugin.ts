import { useEffect } from "react"
import { useGlobal } from "../context"

export const useSetCurrentPlugin = (plugin: string) => {
  const { setCurrentPlugin } = useGlobal()
  
  useEffect(() => {
    setCurrentPlugin(plugin)
  }, [])
}