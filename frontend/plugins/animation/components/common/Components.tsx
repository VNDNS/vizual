import { useAnimation } from "../../context"

export const Components = () => {
  
  const { components, selectedComponent, setSelectedComponent } = useAnimation()

  const handleClick = (id: number) => {
    if(selectedComponent === id) {
      setSelectedComponent(null)
    } else {
      setSelectedComponent(id)
    }
  }

  return (
    <div className="components">
      {components.map((component: any) => (
        <div 
          key={component.id}
          className={`components-item ${selectedComponent === component.id ? 'components-item-selected' : ''}`} 
          style={{ backgroundColor: component.color }}
          onClick={() => handleClick(component.id)}
        >
          <div className="components-item-values">
          </div>
        </div>
      ))}
    </div>
  )
} 