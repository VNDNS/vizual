export const ensureParentLink = (nodes: any[], node: any) => {
  if (node.parent) {
    const parent = nodes.find((item: any) => item.id === node.parent)
    if (parent) {
      if (Array.isArray(parent.children) && !parent.children.includes(node.id)) {
        parent.children.push(node.id)
      }
      if (!Array.isArray(parent.children)) {
        parent.children = [node.id]
      }
    }
  }
  if (Array.isArray(node.parents)) {
    node.parents.forEach((parentId: any) => {
      const parent = nodes.find((item: any) => item.id === parentId)
      if (parent) {
        if (Array.isArray(parent.children) && !parent.children.includes(node.id)) {
          parent.children.push(node.id)
        }
        if (!Array.isArray(parent.children)) {
          parent.children = [node.id]
        }
      }
    })
  }
}

