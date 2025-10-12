import { Edges } from "./Edges";
import { Nodes } from "./Nodes";

export const FlowChart = ({ data }: any) => {

  const { nodes, edges } = data
  
  return (
    <g>
      <Edges edges={edges} />
      <Nodes nodes={nodes} />
    </g>
  );
};
