import { EdgeType } from "@context/types/EdgeType";
import { createEdgeFromNodes } from "./createEdgeFromNodes";

export const buildInitialEdges = (nodes: any[], idMap: Map<any, any>, existingEdges: any[]) => {
  const edges: EdgeType[] = [];
  const edgeIds = new Set<string>();

  nodes?.forEach((node: any) => {
    if (Array.isArray(node.children) && node.children.length > 0) {
      node.children.forEach((childId: number) => {
        const childNode = idMap.get(childId);
        if (!childNode) return;

        const edgeId = `${node.id}-${childNode.id}`;
        if (edgeIds.has(edgeId)) return;
        
        const existingEdge = existingEdges?.find((e: any) => e.id === edgeId);
        const edge = createEdgeFromNodes(node, childNode, existingEdge);
        edges.push(edge);
        edgeIds.add(edgeId);
      });
    }
    if (Array.isArray(node.parents) && node.parents.length > 0) {
      node.parents.forEach((parentId: number) => {
        const parentNode = idMap.get(parentId);
        if (!parentNode) return;

        const edgeId = `${parentNode.id}-${node.id}`;
        if (edgeIds.has(edgeId)) return;
        
        const existingEdge = existingEdges?.find((e: any) => e.id === edgeId);
        const edge = createEdgeFromNodes(parentNode, node, existingEdge);
        edges.push(edge);
        edgeIds.add(edgeId);
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
