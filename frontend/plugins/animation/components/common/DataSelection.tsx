import { useAnimation } from "../../context"
import { componentMap } from "../../maps/componentMap"

const fileTypes = Object.keys(componentMap)

export const DataSelection = () => {

  // state
  const { fileType, setFileType } = useAnimation()

  return (
    <select 
      value={fileType}
      onChange={(e) => setFileType(e.target.value)}
      className="data-selection"
    >
      {fileTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  )
}