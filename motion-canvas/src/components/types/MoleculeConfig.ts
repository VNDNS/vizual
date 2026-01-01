export interface MoleculeConfig {
  PC_Compounds: {
    atoms: {
      aid: number[];
      element: number[];
    };
    bonds?: {
      aid1: number[];
      aid2: number[];
      order: number[];
    };
    coords: {
      aid: number[];
      conformers: {
        x: number[];
        y: number[];
      }[];
    }[];
  }[];
}
