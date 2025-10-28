import { NodeProps } from "@motion-canvas/2d";
import { FlowChartConfig } from "./FlowChartConfig";

export interface FlowChartProps extends NodeProps {
  data: FlowChartConfig;
}
