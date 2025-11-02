import { FileDisplay } from "../../../../common/components/FileDisplay"
import { ColorPicker } from "../../../../common/components/ColorPicker"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"
import { OptionSelection } from "../../common/OptionSelection"
import { ArrayConfiguration } from "../../common/ArrayConfiguration"
import { useHandleSetNodeName } from "./useHandleSetNodeName"
import { useHandleSetNodeType } from "./useHandleSetNodeType"
import { useHandleSetNodeWidth } from "./useHandleSetNodeWidth"
import { useHandleSetNodeHeight } from "./useHandleSetNodeHeight"
import { useHandleSetNodeColor } from "./useHandleSetNodeColor"
import { useHandleSetNodeImage } from "./useHandleSetNodeImage"
import { useHandleSetNodeImageWidth } from "./useHandleSetNodeImageWidth"
import { useHandleDeleteNode } from "./useHandleDeleteNode"
import { useHandleAddNode } from "./useHandleAddNode"
import { useFadeInNodes } from "./useFadeInNodes"
import { useHandleAddInfo } from "./useHandleAddInfo"
import { useHandleSetInfoValue } from "./useHandleSetInfoValue"
import { useHandleDeleteInfo } from "./useHandleDeleteInfo"
import { useNodeImageFile } from "./useNodeImageFile"
import { useSelectedInfo } from "./useSelectedInfo"

export const NodeConfiguration = () => {
  
  const { getSelectedNode, getSelectedComponent } = useAnimationHooks()
  const { imageFile, setImageFile }               = useNodeImageFile()
  const { selectedInfo, setSelectedInfo }         = useSelectedInfo()
  
  const handleSetName       = useHandleSetNodeName()
  const handleSetNodeType   = useHandleSetNodeType()
  const handleSetWidth      = useHandleSetNodeWidth()
  const handleSetHeight     = useHandleSetNodeHeight()
  const handleSetColor      = useHandleSetNodeColor()
  const handleSetImageBase  = useHandleSetNodeImage()
  const handleSetImageWidth = useHandleSetNodeImageWidth()
  const handleDeleteNode    = useHandleDeleteNode()
  const handleAddNode       = useHandleAddNode()
  const fadeInNodes         = useFadeInNodes()
  const handleAddInfo       = useHandleAddInfo()
  const handleSetInfoValue  = useHandleSetInfoValue()
  const handleDeleteInfo    = useHandleDeleteInfo()
  const selectedNode        = getSelectedNode()
  const selectedComponent   = getSelectedComponent()

  const handleSetImage = (image: string) => {
    handleSetImageBase(image)
    setImageFile(image)
  }


  if(selectedComponent?.type !== 'flowChart') {
    return null
  }

  const selectedInfo_ = selectedNode?.infos?.find((info: any) => info.id === selectedInfo)

  return (
    <>
      <div className="input-group">
        <span>Name</span>
        <input type="text" value={selectedNode?.name} onChange={(e) => handleSetName(e.target.value)} />
      </div>
      <FileDisplay directoryKey="node-image" state={imageFile} setState={handleSetImage} />
      {selectedNode?.image && (
        <div className="input-group">
          <span>Image Width</span>
          <input type="number" step={10} value={selectedNode?.imageWidth ?? 210} onChange={(e) => handleSetImageWidth(Number(e.target.value))} />
        </div>
      )}
      <div className="node-type-selection">
        <OptionSelection label="Node Type" options={['square', 'circle', 'text', 'logo']} setValue={handleSetNodeType} value={selectedNode?.type || ''} />
      </div>
      <div className="input-group">
        <span>Width</span>
        <input type="number" step={60} value={selectedNode?.width ?? 240} onChange={(e) => handleSetWidth(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <span>Height</span>
        <input type="number" step={60} value={selectedNode?.height ?? 240} onChange={(e) => handleSetHeight(Number(e.target.value))} />
      </div>
      <ColorPicker value={selectedNode?.color || 'hsl(0, 70%, 50%)'} onChange={handleSetColor} />
      <button onClick={handleDeleteNode}>Delete</button>
      <button onClick={handleAddNode}>Add Node</button>
      <button onClick={() => fadeInNodes()}>Fade In Nodes</button>
      <div className="input-group">
        <span>Info</span>
        <input type="text" value={selectedInfo_?.name} onChange={(e) => handleSetInfoValue(e.target.value, selectedInfo)} />
      </div>
      <button onClick={handleAddInfo}>Add Info</button>
      <ArrayConfiguration options={selectedNode?.infos} setValue={setSelectedInfo} value={selectedInfo} onDelete={(id) => handleDeleteInfo(id, setSelectedInfo)} />
    </>
  )
}