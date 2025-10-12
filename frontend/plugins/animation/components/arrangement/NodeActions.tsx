interface NodeActionsProps {
  onDeleteNode: () => void
  onAddNode: () => void
  onAddContainer: () => void
  onAddChild?: () => void
  showAddChild: boolean
}

export const NodeActions = ({ 
  onDeleteNode, 
  onAddNode, 
  onAddContainer, 
  onAddChild,
  showAddChild 
}: NodeActionsProps) => {
  return (
    <>
      <button onClick={onDeleteNode}>Delete</button>
      <button onClick={onAddNode}>Add Node</button>
      <button onClick={onAddContainer}>Add Container</button>
      {showAddChild && onAddChild && <button onClick={onAddChild}>Add Child</button>}
    </>
  )
}

