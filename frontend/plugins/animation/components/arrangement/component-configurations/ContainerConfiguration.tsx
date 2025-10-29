import { useAnimation } from "@context/context"
import { useAnimationHooks } from "@context/hooks/useAnimationHooks"
import { useEffect, useState } from "react"
import { id } from "../../../../../../common/id"
import { FileDisplay } from "../../../../common/components/FileDisplay"
import { ArrayConfiguration } from "../../common/ArrayConfiguration"

export const ContainerConfiguration = () => {

  const { getSelectedComponent } = useAnimationHooks()
  const selectedComponent = getSelectedComponent()
  const { setComponents, components, setAnimation, animation } = useAnimation()

  if(selectedComponent?.type !== 'container') return null


  const handleSetRows = (value: string) => {
    const rows = parseInt(value)
    if(selectedComponent) {
      selectedComponent.configuration.data.rows = rows
      const width_ = 4*60*rows + (rows-1)*60+120
      const comlumns = Math.ceil(selectedComponent.configuration.data.items.length / rows)
      const height_ = 4*60*comlumns + (comlumns-1)*60+120
      selectedComponent.configuration.width = width_
      selectedComponent.configuration.height = height_
    }
    setComponents([...components])
  }

  const setImage = (image: string) => {
    const index = selectedComponent?.configuration?.data?.items.findIndex((item: any) => item.id === selectedItem)
    selectedComponent.configuration.data.items[index].image = image
    setImageFile(image)
    setComponents([...components])
  }

  const handleAddItem = () => {
    const items = selectedComponent?.configuration?.data?.items || []
    items.push({ name:'Item ' + items.length, id: id() })
    setComponents([...components])
  }

  const handleSetSelectedItem = (id: string) => {
    setSelectedItem(id)
  }

  const handleSetName = (name: string) => {
    const index = selectedComponent?.configuration?.data?.items.findIndex((item: any) => item.id === selectedItem)
    selectedComponent.configuration.data.items[index].name = name
    setComponents([...components])
  }

  const handleDeleteItem = (id: string) => {
    if (selectedComponent?.configuration?.data?.items) {
      selectedComponent.configuration.data.items = selectedComponent.configuration.data.items.filter((item: any) => item.id !== id)
      if (selectedItem === id) {
        setSelectedItem('')
      }
      setComponents([...components])
    }
  }

  const getParentName = (id: number) => {
    const flowChart = components.find((component: any) => component.type === 'flowChart')
    const node = flowChart?.configuration.data.nodes.find((node: any) => node.id === id)
    return node?.name
  }

  const handleSetParent = (parent: string) => {
    const flowChart = components.find((component: any) => component.type === 'flowChart')
    const node = flowChart?.configuration.data.nodes.find((node: any) => node.name === parent)
    selectedComponent.configuration.parent = node.id
    setComponents([...components])
  }

  const fadeInNodes = () => {
    const selectedComponent_ = getSelectedComponent()
    const duration = 1
    const lastAnimation = animation.at(-1)
    const start = (lastAnimation?.start ?? 0) + (lastAnimation?.duration ?? 0)
    const newAnimation = { component: selectedComponent_?.name || '', method: 'fadeIn', duration: duration, start: start, inputs: { }, track: 0, id: id() }
    setAnimation([...animation, newAnimation])
  }

  const [selectedItem, setSelectedItem] = useState<string>('')
  const [imageFile, setImageFile] = useState<string>('')
  const selectedItem_ = selectedComponent?.configuration?.data?.items.find((item: any) => item.id === selectedItem)

  useEffect(() => {
    const item = selectedComponent?.configuration?.data?.items.find((item: any) => item.id === selectedItem)
    setImageFile(item?.image || '')
  }, [selectedItem])


  return (
    <>
      <div> {selectedComponent?.name} </div>
      <div className="input-group">
        <span>Rows</span>
        <input type="number" value={selectedComponent?.configuration?.data?.rows} onChange={(e) => handleSetRows(e.target.value)} />
      </div>
      <div className="input-group">
        <span>Item Name</span>
        <input type="text" value={selectedItem_?.name} onChange={(e) => handleSetName(e.target.value)} />
      </div>
      <div className="input-group">
        <span>Parent</span>
        <input type="text" value={getParentName(selectedComponent?.configuration?.parent)} onChange={(e) => handleSetParent(e.target.value)} />
      </div>
      <button onClick={handleAddItem}>Add Item</button>
      <button onClick={fadeInNodes}>Fade in</button>
      <FileDisplay directoryKey="node-image" state={imageFile} setState={setImage} />
      <ArrayConfiguration options={selectedComponent?.configuration?.data?.items} setValue={handleSetSelectedItem} value={selectedItem} onDelete={handleDeleteItem} />
    </>
  )
}
