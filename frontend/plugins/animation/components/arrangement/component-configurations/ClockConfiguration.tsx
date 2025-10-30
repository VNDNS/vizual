import { useAnimation } from "@context/context"
import { useAnimationHooks } from "@context/hooks/useAnimationHooks"
import { id } from "../../../../../../common/id"

export const ClockConfiguration = () => {

  const { getSelectedComponent } = useAnimationHooks()
  const selectedComponent = getSelectedComponent()
  const { setComponents, components, setAnimation, animation } = useAnimation()

  if(selectedComponent?.type !== 'clock') return null

  const handleAddTime = () => {
    if(selectedComponent) {
      const times = selectedComponent.configuration.data.times || []
      times.push({ hours: 0, minutes: 0, seconds: 0 })
      selectedComponent.configuration.data.times = times
      setComponents([...components])
    }
  }

  const handleUpdateTime = (index: number, field: 'hours' | 'minutes' | 'seconds', value: string) => {
    const numValue = parseInt(value)
    if(selectedComponent && !isNaN(numValue)) {
      const times = selectedComponent.configuration.data.times || []
      if(times[index]) {
        times[index][field] = numValue
        selectedComponent.configuration.data.times = times
        setComponents([...components])
      }
    }
  }

  const handleRemoveTime = (index: number) => {
    if(selectedComponent) {
      const times = selectedComponent.configuration.data.times || []
      times.splice(index, 1)
      selectedComponent.configuration.data.times = times
      setComponents([...components])
    }
  }

  const fadeInClock = () => {
    const selectedComponent_ = getSelectedComponent()
    const duration = 1
    const lastAnimation = animation.at(-1)
    const start = (lastAnimation?.start ?? 0) + (lastAnimation?.duration ?? 0)
    const newAnimation = { component: selectedComponent_?.name || '', method: 'fadeIn', duration: duration, start: start, inputs: { }, track: 0, id: id() }
    setAnimation([...animation, newAnimation])
  }

  const animateHands = () => {
    const selectedComponent_ = getSelectedComponent()
    const times = selectedComponent_?.configuration?.data?.times || []
    const duration = times.length * 2
    const lastAnimation = animation.at(-1)
    const start = (lastAnimation?.start ?? 0) + (lastAnimation?.duration ?? 0)
    const newAnimation = { component: selectedComponent_?.name || '', method: 'animateHands', duration: duration, start: start, inputs: { }, track: 0, id: id() }
    setAnimation([...animation, newAnimation])
  }

  const times = selectedComponent?.configuration?.data?.times || []

  return (
    <>
      <div> {selectedComponent?.name} </div>
      <button onClick={handleAddTime}>Add Time</button>
      {times.map((time: any, index: number) => (
        <div key={index}>
          <div className="input-group">
            <span>Hours</span>
            <input type="number" value={time.hours} onChange={(e) => handleUpdateTime(index, 'hours', e.target.value)} />
          </div>
          <div className="input-group">
            <span>Minutes</span>
            <input type="number" value={time.minutes} onChange={(e) => handleUpdateTime(index, 'minutes', e.target.value)} />
          </div>
          <div className="input-group">
            <span>Seconds</span>
            <input type="number" value={time.seconds} onChange={(e) => handleUpdateTime(index, 'seconds', e.target.value)} />
          </div>
          <button onClick={() => handleRemoveTime(index)}>Remove</button>
        </div>
      ))}
      <button onClick={fadeInClock}>Fade In</button>
      <button onClick={animateHands}>Animate Hands</button>
    </>
  )
}

