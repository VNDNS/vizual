import { id } from "../../../../../common/id"
import { useAnimation } from "../../context"

export const CameraConfiguration = () => {

  const { animation, setAnimation, camera, selectedItems, components } = useAnimation()

  const addAnimation = () => {

    const zoom = camera.width / 1920

    //setLastCamera({x: camera.x, y: camera.y, zoom: camera.zoom, width: camera.width, height: camera.height})

    const start = (animation.at(-1)?.start || 0) + (animation.at(-1)?.duration || 0)
    
    const newAnimation = { 
      component: 'camera', 
      method: 'to', 
      duration: 1, 
      start: start, 
      inputs: {x: camera.x, y: camera.y, zoom: 1/zoom}, 
      track: 0, 
      id: id() 
    }
    setAnimation([...animation, newAnimation])
  }

  const focusOnSelectedItems = () => {
    
    //setLastCamera({x: camera.x, y: camera.y, zoom: camera.zoom, width: camera.width, height: camera.height})
    
    const start = (animation.at(-1)?.start || 0) + (animation.at(-1)?.duration || 0)

    console.log("selectedItems", selectedItems)

    const items: any[] = []
    
    selectedItems.forEach((item: any) => {
      const component = components.find((component: any) => component.id === item.id);
      if(item.itemType === 'node') {
        items.push({x: item.x, y: item.y, height: 240, width: 240})
      }
      if(item.itemType === 'container') {
        items.push({x: component?.configuration.x, y: component?.configuration.y, height: component?.configuration.height, width: component?.configuration.width})
      }
    })

    const ds = 60
    const minX = Math.min(...items.map((item: any) => item.x-item.width/2 - ds))
    const minY = Math.min(...items.map((item: any) => item.y-item.height/2 - ds))
    const maxX = Math.max(...items.map((item: any) => item.x+item.width/2 + ds))
    const maxY = Math.max(...items.map((item: any) => item.y+item.height/2 + ds))
    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2

    const deltaHeight  = maxY - minY
    const width = (maxX - minX)
    const computedHeight = width * 1080 / 1920
    let zoom
    if(deltaHeight > computedHeight) {
      zoom = deltaHeight / 1080
    } else {
      zoom = width / 1920
    }
    
    // const zoom = width / 1920

    const newAnimation = { 
      component: 'camera', 
      method: 'to', 
      duration: 1, 
      start: start, 
      inputs: {x: centerX, y: centerY, zoom: 1/zoom}, 
      track: 0, 
      id: id() 
    }
    setAnimation([...animation, newAnimation])
  }



  return (
    <>
      <button onClick={() => addAnimation()}>Add animation</button>
      <button onClick={() => focusOnSelectedItems()}>Focus on selected items ({selectedItems.length})</button>
    </>
  )
}