import { useAnimation } from "@context/context"
import { ModeSelection } from "../common/ModeSelection"
import { NodeConfiguration } from "./component-configurations/NodeConfiguration"
import { EdgeConfiguration } from "./component-configurations/EdgeConfiguration"
import { AnimationConfiguration } from "../../../../../archive/AnimationConfiguration"
import { CameraConfiguration } from "./component-configurations/CameraConfiguration"
import { PanelConfiguration } from "./component-configurations/PanelConfiguration"
import { sidebarOptions } from "./sidebarOptions"
import { ContainerConfiguration } from "./component-configurations/ContainerConfiguration"
import { TableConfiguration } from "./component-configurations/TableConfiguration"

export const Sidebar = () => {

  const { sidebarMode, setSidebarMode } = useAnimation()

  return (
    <div className="sidebar">
      <ModeSelection options={sidebarOptions} setMode={setSidebarMode} mode={sidebarMode} />
      <div className="sidebar-title">{sidebarMode}</div>
      <div className="sidebar-content">
        {sidebarMode === 'node-configuration'       && <NodeConfiguration />}
        {sidebarMode === 'container-configuration'  && <ContainerConfiguration />}
        {sidebarMode === 'edge-configuration'       && <EdgeConfiguration />}
        {sidebarMode === 'camera-configuration'     && <CameraConfiguration />}
        {sidebarMode === 'animation-configuration'  && <AnimationConfiguration />}
        {sidebarMode === 'panel-configuration'      && <PanelConfiguration />}
        {sidebarMode === 'table-configuration'      && <TableConfiguration />}
      </div>
    </div>
  )
}