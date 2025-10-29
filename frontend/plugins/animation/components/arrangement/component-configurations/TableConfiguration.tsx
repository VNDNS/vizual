import { useAnimation } from "@context/context"
import { useAnimationHooks } from "@context/hooks/useAnimationHooks"
import { id } from "../../../../../../common/id"

export const TableConfiguration = () => {

  const { getSelectedComponent } = useAnimationHooks()
  const selectedComponent = getSelectedComponent()
  const { setComponents, components, setAnimation, animation } = useAnimation()

  if(selectedComponent?.type !== 'table') return null

  const handleSetRows = (value: string) => {
    const rows = parseInt(value)
    if(selectedComponent && !isNaN(rows) && rows > 0) {
      selectedComponent.configuration.data.rows = rows
      const columns = selectedComponent.configuration.data.columns || 3
      const existingData = selectedComponent.configuration.data.data || []
      const newData = []
      for(let i = 0; i < rows; i++) {
        if(existingData[i]) {
          newData.push(existingData[i].slice(0, columns))
          while(newData[i].length < columns) {
            newData[i].push('')
          }
        } else {
          newData.push(new Array(columns).fill(''))
        }
      }
      selectedComponent.configuration.data.data = newData
    }
    setComponents([...components])
  }

  const handleSetColumns = (value: string) => {
    const columns = parseInt(value)
    if(selectedComponent && !isNaN(columns) && columns > 0) {
      selectedComponent.configuration.data.columns = columns
      const rows = selectedComponent.configuration.data.rows || 3
      const existingData = selectedComponent.configuration.data.data || []
      const newData = []
      for(let i = 0; i < rows; i++) {
        if(existingData[i]) {
          newData.push(existingData[i].slice(0, columns))
          while(newData[i].length < columns) {
            newData[i].push('')
          }
        } else {
          newData.push(new Array(columns).fill(''))
        }
      }
      selectedComponent.configuration.data.data = newData
    }
    setComponents([...components])
  }

  const handleGenerateRandomData = () => {
    if(selectedComponent) {
      const rows = selectedComponent.configuration.data.rows || 3
      const columns = selectedComponent.configuration.data.columns || 3
      const newData: (string | number)[][] = []
      for(let i = 0; i < rows; i++) {
        newData.push([])
        for(let j = 0; j < columns; j++) {
          newData[i].push(Math.floor(Math.random() * 101))
        }
      }
      selectedComponent.configuration.data.data = newData
      setComponents([...components])
    }
  }

  const handleSetColorScheme = (value: string) => {
    if(selectedComponent) {
      selectedComponent.configuration.data.colorScheme = value
      setComponents([...components])
    }
  }

  const fadeInTable = () => {
    const selectedComponent_ = getSelectedComponent()
    const duration = 1
    const lastAnimation = animation.at(-1)
    const start = (lastAnimation?.start ?? 0) + (lastAnimation?.duration ?? 0)
    const newAnimation = { component: selectedComponent_?.name || '', method: 'fadeIn', duration: duration, start: start, inputs: { }, track: 0, id: id() }
    setAnimation([...animation, newAnimation])
  }

  return (
    <>
      <div> {selectedComponent?.name} </div>
      <div className="input-group">
        <span>Rows</span>
        <input type="number" value={selectedComponent?.configuration?.data?.rows} onChange={(e) => handleSetRows(e.target.value)} />
      </div>
      <div className="input-group">
        <span>Columns</span>
        <input type="number" value={selectedComponent?.configuration?.data?.columns} onChange={(e) => handleSetColumns(e.target.value)} />
      </div>
      <div className="input-group">
        <span>Color Scheme</span>
        <select value={selectedComponent?.configuration?.data?.colorScheme || 'gray'} onChange={(e) => handleSetColorScheme(e.target.value)}>
          <option value="gray">Gray</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="purple">Purple</option>
          <option value="orange">Orange</option>
        </select>
      </div>
      <button onClick={handleGenerateRandomData}>Generate Random Data</button>
      <button onClick={fadeInTable}>Fade In</button>
    </>
  )
}

