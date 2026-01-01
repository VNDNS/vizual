import { useSetScene }  from "../../hooks/useSetScene"
import { useAnimation } from "../../context"
import { id } from "../../../../../common/id"
import { componentUIColors } from "../../maps/componentUIColors"
import { getDirectory } from "../../../common/requests/get-directory"
import { getJson } from "../../../common/requests/get-json"
import { ComponentUI } from "../../../../../types/ComponentUI"
import { componentTypes } from "../../maps/componentTypes"


export const ComponentSelection = () => {

  // state
  const { fileType, setFileType, components, setComponents } = useAnimation()
  
  useSetScene()

  const addComponent = async () => {

    const files = await getDirectory(fileType)
    const name   = fileType + components.length
    const color  = componentUIColors[components.length % componentUIColors.length]
    const fullPath = 'server/data/' + fileType + '/' + files[0]
    const data = await getJson(fullPath)

    const component: ComponentUI = {
      type: fileType,
      configuration: {
        file: files[0],
        data: data,
        x: 0,
        y: 0, 
        width: 240,
        height: 240,
      },
      data: null,
      color,
      id: id(),
      name
    }
    setComponents([...components, component])
  }

  return (
    <div className="component-selection">
      <div className="component-selection-dropdown">
        <select 
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          className="file-type-dropdown"
        >
          {componentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <button className="component-selection-add" onClick={() => addComponent()}>
        add
      </button>
    </div>
  )
}