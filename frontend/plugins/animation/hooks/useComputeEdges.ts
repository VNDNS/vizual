import { useAnimation } from "@context/context";
import { buildIdMap } from "./utils/buildNodeMaps";
import { buildComponentEdges, buildInitialEdges } from "./utils/buildInitialEdges";
import { groupEdgesBySourceAndSide } from "./utils/groupEdgesBySourceAndSide";
import { distributeEdgesOnSameSide } from "./utils/distributeEdgesOnSameSide";
import { computeIntermediatePoints } from "./utils/computeIntermediatePoints";
import { addStartAndEndPoints } from "./utils/addStartAndEndPoints";
import { EdgeType } from "@context/types/EdgeType";
import { chamferPoints } from "./utils/chamferPoints";
import { copy } from "../../../../common/copy";
import { ComponentUI } from "types/ComponentUI";

const getIntermediatePoints = (edges: EdgeType[]) => {
  const newEdges = edges.map(edge => ({ ...edge }));
  newEdges.forEach(computeIntermediatePoints);
  return newEdges;
};

const getEdgesWithStartAndEndPoints = (edges: EdgeType[]) => {
  const newEdges = edges.map(edge => ({ ...edge }));
  newEdges.forEach(addStartAndEndPoints);
  return newEdges;
};

export const useComputeEdges = () => {
  const { setComponents, components } = useAnimation();

  const computeEdges = () => {
    const flowChart = components.find((component: any) => component.type === 'flowChart');
    const nodes = flowChart?.configuration.data.nodes;
    
    const idMap          = buildIdMap(nodes);
    const existingEdges  = flowChart?.configuration.data.edges || [];
    let edges            = buildInitialEdges(nodes, idMap, existingEdges);
    edges                = buildComponentEdges(components, idMap, edges);
    const groupMap       = groupEdgesBySourceAndSide(edges, idMap);
    edges                = distributeEdgesOnSameSide(edges, groupMap);
    edges                = getIntermediatePoints(edges);
    edges                = getEdgesWithStartAndEndPoints(edges);
    edges                = chamferPoints(edges);

    const newComponents = copy(components);
    const index         = newComponents.findIndex((c: ComponentUI) => c.id === flowChart?.id)
    if(index === -1) return;
    newComponents[index].configuration.data.edges = edges;
    newComponents.forEach((component: any) => {
      if(component.type !== 'container') return ;
      const edge = edges.find((e: any) => e.externalTargetId === component.id);
      if(edge) {
        component.configuration.edge = edge;
      }
    });
    setComponents(newComponents);
  };

  return { computeEdges };
};
