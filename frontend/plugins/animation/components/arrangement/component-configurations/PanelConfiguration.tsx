import { useAnimation } from "@context/context"
import { id } from "../../../../../../common/id"
import { useEffect, useState } from "react"
import { FileDisplay } from "../../../../common/components/FileDisplay"
import { getJson } from "../../../../common/requests/get-json"

export const PanelConfiguration = () => {

  const { animation, setAnimation, setPanelData, panelData } = useAnimation()
  const [data, setData] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState(0)

  const addFadeInAnimation = () => {

    const start = animation.at(-1)?.start + animation.at(-1)?.duration || 0

    const type = panelData.at(0)?.type

    let duration = 1
    if(type === 'pieChart') {
      duration = 1.2
    }
    if(type === 'barChart') {
      duration = (panelData[0].data.length-1) * .2 + 1
    }
    
    const newAnimation = { 
      component: 'panel', 
      method: 'fadeIn', 
      duration: duration, 
      start: start, 
      inputs: {}, 
      track: 0, 
      id: id() 
    }
    setAnimation([...animation, newAnimation])
  }

  const addFadeOutAnimation = () => {

    const start = animation.at(-1)?.start + animation.at(-1)?.duration || 0
    
    const newAnimation = { 
      component: 'panel', 
      method: 'fadeOut', 
      duration: 1, 
      start: start, 
      inputs: {}, 
      track: 0, 
      id: id() 
    }
    setAnimation([...animation, newAnimation])
  }

  const addNextAnimation = () => {

    const start = animation.at(-1)?.start + animation.at(-1)?.duration || 0
    const type = panelData.at(currentIndex)?.type

    let duration = 1
    if(type === 'pieChart') {
      duration = 1.2
    }
    if(type === 'barChart') {
      duration = (panelData[currentIndex].data.length) * .2 + 1
    }
    if(type === 'linePlot') {
      duration = (panelData[currentIndex].data.length) * .3 + 2
    }
    if(type === 'keyValueTable') {
      const cells = panelData[currentIndex].data.length
      duration = cells * .2 + .6
    }
    if(type === 'text') {
      duration = 1.2
    }
    
    const newAnimation = { 
      component: 'panel', 
      method: 'next', 
      duration: duration, 
      start: start, 
      inputs: {}, 
      track: 0, 
      id: id() 
    }
    setAnimation([...animation, newAnimation])
    const newIndex = animation.findAll((a: any) => a.component === 'panel' && a.method === 'next').length-1 || 0
    setCurrentIndex(newIndex)
  }

  const handleSetData = (data: string) => {
    setData(data)
    const fullPath = '/home/viktor/code/vizual/server/data/panel/' + data
    getJson(fullPath).then(data => {
      setPanelData(data)
    })
  }

  useEffect(() => {
    setCurrentIndex(animation.filter((a: any) => a.component === 'panel' && (a.method === 'next' || a.method === 'fadeIn')).length || 0)
  }, [animation])

  return (
    <>
      <FileDisplay directoryKey="panel" state={data} setState={handleSetData} />
      <button onClick={() => addFadeInAnimation()}>Add fade in animation</button>
      <button onClick={() => addFadeOutAnimation()}>Add fade out animation</button>
      <button onClick={() => addNextAnimation()}>Add next animation</button>
      <span>current index: {currentIndex}</span>
    </>
  )
}