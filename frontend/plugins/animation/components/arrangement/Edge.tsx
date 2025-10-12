import React from "react"

interface EdgeProps {
  onClick: () => void
  points: { x: number; y: number }[]
}

const Edge: React.FC<EdgeProps> = ({ onClick, points }) => {

  return (
    <g onClick={onClick}>
      <polyline
        points={points.map(p => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="white"
        strokeWidth={5}
      />
    </g>
  )
}

export default Edge
