import { useAnimation } from "@context/context"
import { MethodConfiguration } from "../animation/MethodConfiguration"
import { MethodSelection } from "../animation/MethodSelection"

export const AnimationConfiguration = () => {

  const { selectedMethod } = useAnimation()

  return (
    <>
      <MethodSelection />
      {selectedMethod && <MethodConfiguration />}
    </>
  )
}