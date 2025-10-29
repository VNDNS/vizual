import { useAnimation } from "@context/context"
import { ModeSelection } from "../common/ModeSelection"
import { NodeConfiguration } from "./NodeConfiguration"
import { EdgeConfiguration } from "./EdgeConfiguration"
import { AnimationConfiguration } from "./AnimationConfiguration"
import { CameraConfiguration } from "./CameraConfiguration"
import { BackgroundConfiguration } from "./BackgroundConfiguration"
import { PanelConfiguration } from "./PanelConfiguration"
import { ContainerConfiguration } from "./ContainerConfiguration"
import { sidebarOptions } from "./sidebarOptions"

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
        {sidebarMode === 'background-configuration' && <BackgroundConfiguration />}
      </div>
    </div>
  )
}