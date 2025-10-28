import { NodeConfig } from "./NodeConfig";
import { EdgeConfig } from "./EdgeConfig";


export interface FlowChartConfig {
  nodes: NodeConfig[];
  edges: EdgeConfig[];
  name: string;
}
