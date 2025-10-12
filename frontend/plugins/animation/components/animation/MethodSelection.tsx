import { useAnimation } from "@context/context"
import { BarChartConfiguration } from "./component-configurations/BarChartConfiguration"
import { FlowChartConfiguration } from "./component-configurations/FlowChartConfiguration"
import { ItemConfiguration } from "./component-configurations/ItemConfiguration"
import { LargeNumberConfiguration } from "./component-configurations/LargeNumberConfiguration"
import { LinePlotConfiguration } from "./component-configurations/LinePlotConfiguration"
import { PieChartConfiguration } from "./component-configurations/PieChartConfiguration"
import { RadarChartsConfiguration } from "./component-configurations/RadarChartsConfigurations"
import { TimeLineConfiguration } from "./component-configurations/TimeLineConfiguration"
import { BackgroundConfiguration } from "./component-configurations/BackgroundConfiguration"
import { ComponentUI } from "../../../../../types/ComponentUI"

export const MethodSelection = () => {

  const {
    components,
    selectedComponent
  } = useAnimation()

  const component = components.find((component: ComponentUI) => component.id === selectedComponent)

  return (
      <div className="component-configuration" style={{backgroundColor: component?.color}}>
        {component?.type === 'barChart' && (
          <BarChartConfiguration />
        )}
        {component?.type === 'radarCharts' && (
          <RadarChartsConfiguration />
        )}
        {component?.type === 'pieChart' && (
          <PieChartConfiguration />
        )}
        {component?.type === 'linePlot' && (
          <LinePlotConfiguration />
        )}
        {component?.type === 'timeLine' && (
          <TimeLineConfiguration />
        )}
        {component?.type === 'dynamicBarChart' && (
          <div>
            DynamicBarChart Configuration
          </div>
        )}
        {component?.type === 'largeNumber' && (
          <LargeNumberConfiguration />
        )}
        {component?.type === 'item' && (
          <ItemConfiguration />
        )}
        {/* {component?.type === 'flowChart' && (
          <FlowChartConfiguration />
        )} */}
        {component?.type === 'background' && (
          <BackgroundConfiguration />
        )}
      </div>
  )
}