import { useAnimation } from '../../context'

interface AnalysisResult {
  heartContainers: number
  rupees: number
  snapshotIndex: number
  [key: string]: any
}

export const VideoAnalysisPlot = () => {
  const { videoAnalysisData } = useAnimation()

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

  const plotWidth = 800
  const plotHeight = 400
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
    <div className="video-analysis-plot" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
      <h3 style={{ color: '#fff', marginBottom: '20px' }}>Analysis Data</h3>
      <svg width={plotWidth} height={plotHeight} style={{ backgroundColor: '#2a2a2a', borderRadius: '4px' }}>
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
                  />
                )
              })}
            </g>
          )
        })}

        <line x1={padding} y1={padding} x2={padding} y2={plotHeight - padding} stroke="#666" strokeWidth="1" />
        <line x1={padding} y1={plotHeight - padding} x2={plotWidth - padding} y2={plotHeight - padding} stroke="#666" strokeWidth="1" />
      </svg>

      <div style={{ marginTop: '10px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {numericalFields.map((field, index) => {
          const color = colors[index % colors.length]
          return (
            <div key={field} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: color, borderRadius: '2px' }} />
              <span style={{ color: '#fff', fontSize: '14px' }}>
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

