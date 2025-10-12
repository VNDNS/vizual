import { EdgeType } from "@context/types/EdgeType";
import { copy } from "../../../../../common/copy";
import { ComponentUI } from "types/ComponentUI";

export const updateComponentWithEdges = (
  setComponents: any,
  component: any,
  edges: EdgeType[]
) => {
  const newComponent = copy(component);
  const index = newComponent.findIndex((c: ComponentUI) => c.id === component?.id)
  newComponent[index].configuration.data.edges = edges;
  setComponents(newComponent);

};

