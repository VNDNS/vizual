import { useAnimation } from "../../context"

export const MethodConfiguration = () => {

  // state
  const { selectedMethod, animation, setAnimation, components } = useAnimation()

  const handleInputChange = (key: string, value: string) => {
    const input = method?.inputs[key] as any
    const processedValue = (input as any)?.type === 'number' ? Number(value) : value
    
    // If we're changing a 'start' or 'duration' input, calculate the time difference
    if (key === 'start' || key === 'duration') {
      const oldStartTime = method?.start || 0
      const oldDuration = method?.duration || 0
      const oldEndTime = oldStartTime + oldDuration

      let timeDifference = 0
      if (key === 'start') {
        timeDifference = (processedValue as number) - oldStartTime
      } else { // duration
        timeDifference = (processedValue as number) - oldDuration
      }

      setAnimation(animation.map((item: any) => {
        // For the selected method, update as before
        if (item.id === selectedMethod?.id) {
          return {
            ...item,
            method: {
              ...item.method,
              [key]: processedValue
            }
          }
        }
        // For methods that come after the selected method, adjust their start time
        if (item.method.inputs.some((input: any) => input.name === 'start' && input.value >= oldEndTime)) {
          return {
            ...item,
            method: {
              ...item.method,
              inputs: item.method.inputs.map((input: any) =>
                input.name === 'start' 
                  ? { ...input, value: input.value + timeDifference }
                  : input
              )
            }
          }
        }
        return item
      }))
      } else {
        // Original logic for other inputs
        setAnimation(animation.map((item: any) =>
          item.id === selectedMethod?.id ?
            {...item, inputs: {...item.inputs, [key]: processedValue}} :
            item
        ))
      }
  }

  const method = animation.find((item: any) => item.id === selectedMethod?.id)
  const component = components.find((component: any) => component.name === method?.component)

  return (
    <div className="method-configuration" style={{backgroundColor: component?.color || 'violet'}}>
      <span>{component?.name}</span>
      <span>{method?.method}</span>
      {Object.keys(method?.inputs || {}).map((key: any) => {
        if((method?.inputs[key] as any)?.type === 'array') { return null }
        return (
          <div className="method-configuration-input" key={key}>
            <span>{key}</span>
            <input 
            type={'number'} 
            value={(method?.inputs[key] as any) ?? ''} 
            step={(method?.inputs[key] as any)?.type === 'number' ? .1 : undefined}
            onChange={(e) => handleInputChange(key, e.target.value)}
          />
          </div>
        )
      })}
      <div className="method-configuration-input">Duration: {method?.duration}</div>
      <div className="method-configuration-input">Start: {method?.start}</div>
    </div>
  )
}