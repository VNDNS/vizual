import { getDirectory } from '../../../common/requests/get-directory'
import { getJson } from '../../../common/requests/get-json'

export const readComponentData = async (componentName: string | undefined) => {
  if (!componentName) {
    return { data: null, hasLayout: false }
  }
  const hasLayout = ['barChart', 'linePlot', 'timeLine', 'radarCharts', 'item', 'container'].includes(componentName)
  const needsData = !['largeNumber', 'item'].includes(componentName)
  if (!needsData) {
    return { data: null, hasLayout }
  }
  const files = await getDirectory(componentName)
  if (!files || files.length === 0) {
    return { data: null, hasLayout }
  }
  const fullPath = `server/data/${componentName}/${files[0]}`
  const data = await getJson(fullPath)
  return { data, hasLayout }
}

