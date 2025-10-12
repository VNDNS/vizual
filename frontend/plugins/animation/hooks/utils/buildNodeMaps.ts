export const buildNodeMaps = (nodes: any[]) => {
  const idMap = new Map();
  const nameMap = new Map();
  nodes?.forEach((node: any) => {
    idMap.set(node.id, node);
    nameMap.set(node.name, node);
  });
  return { idMap, nameMap };
};

export const buildIdMap = (nodes: any[]) => {
  const idMap = new Map();
  nodes?.forEach((node: any) => {
    idMap.set(node.id, node);
  });
  return idMap;
};

export const buildNameMap = (nodes: any[]) => {
  const nameMap = new Map();
  nodes.forEach((node: any) => {
    nameMap.set(node.name, node);
  });
  return nameMap;
};

