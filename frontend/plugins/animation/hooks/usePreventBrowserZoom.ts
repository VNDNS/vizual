import { useEffect } from "react"

export const usePreventBrowserZoom = () => {
  useEffect(() => {
    const preventZoom = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault()
      }
    }

    document.addEventListener("wheel", preventZoom, { passive: false })

    return () => {
      document.removeEventListener("wheel", preventZoom)
    }
  }, [])
}

