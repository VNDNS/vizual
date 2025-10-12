import { useEffect } from "react";
import { useAnimation } from "../context";
import { useAnimationHooks } from "./useAnimationHooks";

export const useUpdateComponents = () => {
  const { setComponents, components, currentData } = useAnimation();
  const { getSelectedComponent } = useAnimationHooks();

  const component = getSelectedComponent();

  useEffect(() => {
    if (component) {
      component.configuration.data = currentData;
      setComponents([...components]);
    }
  }, [currentData]);

};
