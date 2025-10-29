import { useAnimation } from "@context/context"
import { MethodConfiguration } from "./MethodConfiguration"
import { MethodSelection } from "./MethodSelection"

export const AnimationConfiguration = () => {

  const { selectedMethod } = useAnimation()

  return (
    <>
      <MethodSelection />
      {selectedMethod && <MethodConfiguration />}
    </>
  )
}