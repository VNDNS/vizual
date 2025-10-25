import { NodeProps } from "@motion-canvas/2d";
import { EdgeConfig } from "../types/EdgeConfig";
import { NodeConfig } from "./NodeConfig";


export interface FlowChartProps extends NodeProps {
  data: { nodes: NodeConfig[]; edges: EdgeConfig[]; name: string; };
}
