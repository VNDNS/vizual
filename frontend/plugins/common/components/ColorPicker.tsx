import { useState, useEffect } from "react"


const SATURATION = 50
const LIGHTNESS = 60

interface ColorPickerProps {
  value?: string
  onChange: (color: string) => void
}

const parseHsl = (hslString: string): { h: number; s: number; l: number } => {
  const match = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
  if (match) {
    return {
      h: Number(match[1]),
      s: Number(match[2]),
      l: Number(match[3])
    }
  }
  return { h: 0, s: SATURATION, l: LIGHTNESS }
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const defaultColor = value || `hsl(0, ${SATURATION}%, ${LIGHTNESS}%)`
  const initial = parseHsl(defaultColor)

  const hues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
  const greyShades = [0, 25, 50, 75, 100]

  const findClosestHue = (targetHue: number): number => {
    let closest = hues[0]
    let minDiff = Math.abs(targetHue - hues[0])
    
    for (const presetHue of hues) {
      const diff = Math.min(
        Math.abs(targetHue - presetHue),
        Math.abs(targetHue - presetHue + 360),
        Math.abs(targetHue - presetHue - 360)
      )
      if (diff < minDiff) {
        minDiff = diff
        closest = presetHue
      }
    }
    
    return closest
  }

  const [selectedHueBox, setSelectedHueBox] = useState(findClosestHue(initial.h))
  const [selectedGreyShade, setSelectedGreyShade] = useState<number | null>(initial.s === 0 ? greyShades.reduce((prev, curr) =>
    Math.abs(curr - initial.l) < Math.abs(prev - initial.l) ? curr : prev
  ) : null)

  useEffect(() => {
    if (value) {
      const parsed = parseHsl(value)
      if (parsed.s === 0) {
        const closestGrey = greyShades.reduce((prev, curr) =>
          Math.abs(curr - parsed.l) < Math.abs(prev - parsed.l) ? curr : prev
        )
        setSelectedGreyShade(closestGrey)
        setSelectedHueBox(-1)
      } else {
        setSelectedGreyShade(null)
        setSelectedHueBox(findClosestHue(parsed.h))
      }
    }
  }, [value])

  const getColorString = (h: number, s: number, l: number) => {
    return `hsl(${h}, ${s}%, ${l}%)`
  }

  const handleHueChange = (h: number) => {
    setSelectedHueBox(h)
    setSelectedGreyShade(null)
    onChange(getColorString(h, SATURATION, LIGHTNESS))
  }

  const handleGreyShadeChange = (l: number) => {
    setSelectedGreyShade(l)
    setSelectedHueBox(-1)
    onChange(getColorString(0, 0, l))
  }

  return (
    <div className="color-picker">
      <div className="color-picker-hue-boxes">
        {greyShades.map((l) => (
          <div
            key={`grey-${l}`}
            className={`color-picker-hue-box ${selectedGreyShade === l ? 'selected' : ''}`}
            style={{ backgroundColor: getColorString(0, 0, l) }}
            onClick={() => handleGreyShadeChange(l)}
          />
        ))}
      </div>
      <div className="color-picker-hue-boxes">
        {hues.map((h) => (
          <div
            key={h}
            className={`color-picker-hue-box ${selectedHueBox === h ? 'selected' : ''}`}
            style={{ backgroundColor: getColorString(h, SATURATION, LIGHTNESS) }}
            onClick={() => handleHueChange(h)}
          />
        ))}
      </div>
    </div>
  )
}