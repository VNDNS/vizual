import { FlowChartConfiguration } from "./FlowChartTypes"
import { BackgroundData } from "./BackgroundTypes"

export interface BaseConfiguration {
  x: number
  y: number
}

export interface BackgroundConfiguration extends BaseConfiguration {
  data: BackgroundData
  size: number
}

export interface GenericDataConfiguration extends BaseConfiguration {
  data: unknown
  width?: number
  height?: number
  size?: number
}

export type ComponentConfiguration = 
  | FlowChartConfiguration
  | BackgroundConfiguration
  | GenericDataConfiguration

