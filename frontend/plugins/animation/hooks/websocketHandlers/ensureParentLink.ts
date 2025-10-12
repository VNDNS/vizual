export const ensureParentLink = (nodes: any[], node: any) => {
  const parent = nodes.find((item: any) => item.id === node.parent)
  if (!parent) {
    return
  }
  if (Array.isArray(parent.children) && !parent.children.includes(node.id)) {
    parent.children.push(node.id)
  }
  if (!Array.isArray(parent.children)) {
    parent.children = [node.id]
  }
}

