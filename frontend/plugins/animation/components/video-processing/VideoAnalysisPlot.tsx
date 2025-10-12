import { useAnimation } from '../../context'

interface AnalysisResult {
  heartContainers: number
  rupees: number
  snapshotIndex: number
  time: number
  [key: string]: any
}

export const VideoAnalysisPlot = () => {
  const { videoAnalysisData, setVideoPlaybackPosition } = useAnimation()

  if (!videoAnalysisData?.results) {
    return null
  }

  const results: AnalysisResult[] = videoAnalysisData.results

  const numericalFields = Object.keys(results[0] || {}).filter(key => 
    typeof results[0][key] === 'number' && key !== 'snapshotIndex'
  )

  if (numericalFields.length === 0) {
    return null
  }

  const plotWidth = 1280
  const plotHeight = 250
  const padding = 40
  const innerWidth = plotWidth - 2 * padding
  const innerHeight = plotHeight - 2 * padding

  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

  const getMinMax = (field: string) => {
    const values = results.map(r => r[field] as number)
    return {
      min: Math.min(...values),
      max: Math.max(...values)
    }
  }

  const getScaledValue = (value: number, min: number, max: number) => {
    if (max === min) return innerHeight / 2
    return innerHeight - ((value - min) / (max - min)) * innerHeight
  }

  const getXPosition = (index: number) => {
    return (index / (results.length - 1)) * innerWidth
  }

  return (
    <div className="video-analysis-plot">
      <svg width={plotWidth} height={plotHeight}>
        {numericalFields.map((field, fieldIndex) => {
          const { min, max } = getMinMax(field)
          const color = colors[fieldIndex % colors.length]
          
          const points = results.map((result, index) => {
            const x = getXPosition(index) + padding
            const y = getScaledValue(result[field] as number, min, max) + padding
            return `${x},${y}`
          }).join(' ')

          return (
            <g key={field}>
              <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
              />
              {results.map((result, index) => {
                const x = getXPosition(index) + padding
                const y = getScaledValue(result[field] as number, min, max) + padding
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="3"
                    fill={color}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setVideoPlaybackPosition(result.time)}
                  />
                )
              })}
            </g>
          )
        })}

        <line x1={padding} y1={padding} x2={padding} y2={plotHeight - padding} stroke="#666" strokeWidth="1" />
        <line x1={padding} y1={plotHeight - padding} x2={plotWidth - padding} y2={plotHeight - padding} stroke="#666" strokeWidth="1" />
      </svg>

      <div className="legend">
        {numericalFields.map((field, index) => {
          const color = colors[index % colors.length]
          return (
            <div key={field} className="legend-item">
              <div className="legend-color" style={{ backgroundColor: color }} />
              <span>
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

