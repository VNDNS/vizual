import { EdgeConfig } from "./EdgeConfig";
import { NodeConfig } from "./NodeConfig";


export interface FlowChartConfig {
  nodes: NodeConfig[];
  edges: EdgeConfig[];
  name: string;
}
