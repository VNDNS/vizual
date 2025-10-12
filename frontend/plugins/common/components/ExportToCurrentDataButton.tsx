import { useAnimationHooks } from "../../animation/hooks/useAnimationHooks"

export const ExportToCurrentDataButton = () => {
  const { exportToCurrentData } = useAnimationHooks()

  return (
    <button className="export-to-current-data-button" onClick={exportToCurrentData}>Export</button>
  )
}