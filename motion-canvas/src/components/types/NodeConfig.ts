
export interface NodeConfig {
  id: number;
  name: string;
  x: number;
  y: number;
  year: number;
  parent?: number | string;
  parents?: (number | string)[];
  children: (number | string)[];
  image?: string;
  imageWidth?: number;
  type: 'square' | 'circle' | 'text' | 'logo';
  componentId: number;
  infos?: { name: string; id: string; }[];
  width?: number;
  height?: number;
  color?: string;
}
