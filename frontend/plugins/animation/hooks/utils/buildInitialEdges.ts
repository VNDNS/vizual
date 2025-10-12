import { EdgeType } from "@context/types/EdgeType";
import { createEdgeFromNodes } from "./createEdgeFromNodes";

export const buildInitialEdges = (nodes: any[], idMap: Map<any, any>, existingEdges: any[]) => {
  const edges: EdgeType[] = [];

  nodes?.forEach((node: any) => {
    if (Array.isArray(node.children) && node.children.length > 0) {
      node.children.forEach((childId: number) => {
        const childNode = idMap.get(childId);
        if (!childNode) return;

        const edgeId = `${node.id}-${childNode.id}`;
        const existingEdge = existingEdges?.find((e: any) => e.id === edgeId);
        const edge = createEdgeFromNodes(node, childNode, existingEdge);
        edges.push(edge);
      });
    }
  });


  return edges;
};


export const buildComponentEdges = (components: any, idMap: Map<any, any>, edges: any[]) => {
  const edges_: EdgeType[] = [...edges];

  components.forEach((component: any) => {
    if(component.type !== 'container') return ;
    const parentNode = idMap.get(component.configuration.parent);
    if (!parentNode) return ;

    const edgeId = `${parentNode.id}-${component.id}`;
    const existingEdge = edges?.find((e: any) => e.id === edgeId);
    const edge = createEdgeFromNodes(parentNode,{id: component.id, x: component.configuration.x, y: component.configuration.y, width: component.configuration.width, height: component.configuration.height}, existingEdge);
    edge.externalTargetId = component.id;
    edges_.push(edge);
  });


  return edges_;
};
