import { NodeProps } from "@motion-canvas/2d";
import { MoleculeConfig } from "./MoleculeConfig";

export interface MoleculeProps extends NodeProps {
  data: MoleculeConfig;
}

