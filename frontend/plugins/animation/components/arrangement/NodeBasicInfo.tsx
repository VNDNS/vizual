import { FileDisplay } from "../../../common/components/FileDisplay"
import { OptionSelection } from "../common/OptionSelection"

interface NodeBasicInfoProps {
  name: string
  onNameChange: (name: string) => void
  imageFile: string
  onImageChange: (image: string) => void
  nodeType?: string
  onNodeTypeChange: (type: string) => void
}

export const NodeBasicInfo = ({ 
  name, 
  onNameChange, 
  imageFile, 
  onImageChange,
  nodeType,
  onNodeTypeChange 
}: NodeBasicInfoProps) => {
  return (
    <>
      <div className="input-group">
        <span>Name</span>
        <input type="text" value={name} onChange={(e) => onNameChange(e.target.value)} />
      </div>
      <FileDisplay directoryKey="node-image" state={imageFile} setState={onImageChange} />
      <div className="node-type-selection">
        <OptionSelection label="Node Type" options={['square', 'circle']} setValue={onNodeTypeChange} value={nodeType || ''} />
      </div>
    </>
  )
}

