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

    const hasData = ['largeNumber', 'item'].includes(fileType)
    const files = hasData ? [] : await getDirectory(fileType)
    const name   = fileType + components.length
    const color  = componentUIColors[components.length % componentUIColors.length]
    const fullPath = '/home/viktor/code/vizual/server/data/' + fileType + '/' + files[0]
    const data = hasData ? null : await getJson(fullPath)

    //const hasWidthAndHeight = ['barChart', 'linePlot', 'timeLine', 'radarCharts', 'item', 'container'].includes(fileType)

    const component: ComponentUI = {
      type: fileType,
      configuration: {
        data: data,
        x: 0,
        y: 0, 
        // width: hasWidthAndHeight ? 240 : undefined, 
        // height: hasWidthAndHeight ? 240 : undefined, 
        // size: hasWidthAndHeight ? undefined : 240
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