
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
  type: 'square' | 'circle';
  componentId: number;
  infos?: { name: string; id: string; }[];
}
