import { useState, useEffect } from "react"

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
  return { h: 0, s: 70, l: 50 }
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const defaultColor = value || 'hsl(0, 70%, 50%)'
  const initial = parseHsl(defaultColor)
  const [hue, setHue] = useState(initial.h)
  const [saturation, setSaturation] = useState(initial.s)
  const [lightness, setLightness] = useState(initial.l)

  const hues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]

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

  useEffect(() => {
    if (value) {
      const parsed = parseHsl(value)
      setHue(parsed.h)
      setSaturation(parsed.s)
      setLightness(parsed.l)
      setSelectedHueBox(findClosestHue(parsed.h))
    }
  }, [value])

  const getColorString = (h: number, s: number, l: number) => {
    return `hsl(${h}, ${s}%, ${l}%)`
  }

  const handleHueChange = (h: number) => {
    setHue(h)
    setSelectedHueBox(h)
    onChange(getColorString(h, saturation, lightness))
  }

  const handleSaturationChange = (s: number) => {
    setSaturation(s)
    onChange(getColorString(hue, s, lightness))
  }

  const handleLightnessChange = (l: number) => {
    const newLightness = l
    setLightness(newLightness)
    onChange(getColorString(hue, saturation, newLightness))
  }

  return (
    <div className="color-picker">
      <div className="color-picker-hue-boxes">
        {hues.map((h) => (
          <div
            key={h}
            className={`color-picker-hue-box ${selectedHueBox === h ? 'selected' : ''}`}
            style={{ backgroundColor: getColorString(h, saturation, lightness) }}
            onClick={() => handleHueChange(h)}
          />
        ))}
      </div>
      <div className="input-group">
        <span>Saturation</span>
        <input
          type="number"
          min="0"
          max="100"
          value={saturation}
          onChange={(e) => handleSaturationChange(Number(e.target.value))}
        />
      </div>
      <div className="input-group">
        <span>Lightness</span>
        <input
          type="number"
          min="0"
          max="100"
          value={lightness}
          onChange={(e) => handleLightnessChange(Number(e.target.value))}
        />
      </div>
    </div>
  )
}