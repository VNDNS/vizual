const dx = 60 * 20
const dy = 60 * 5

export const arrangeHorizontally = (nodes: any[]) => {
  const root = nodes.find((r) => r.parent === undefined && (!r.parents || r.parents.length === 0))
  if (!root) { return nodes }

  const idMap = new Map(nodes.map((r) => [r.id, r]))

  const levelCount = new Map<number, number>()
  const nextY = (level: number) => {
    const count = levelCount.get(level) ?? 0
    levelCount.set(level, count + 1)
    return count * dy
  }

  const placeChildren = (parentId: number, level: number) => {
    const parent = idMap.get(parentId)
    if (!parent || !parent.children || parent.children.length === 0) { return }

    parent.children.forEach((childId: number) => {
      const child = idMap.get(childId)
      if (child) {
        child.x = level * dx
        child.y = nextY(level)
        placeChildren(child.id, level + 1)
      }
    })
  }

  root.x = 0
  root.y = nextY(0)
  placeChildren(root.id, 1)

  return nodes
};