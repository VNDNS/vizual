import { useState, useEffect } from "react"


const SATURATION = 70
const LIGHTNESS = 50

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
  const [selectedGreyShade, setSelectedGreyShade] = useState<number | null>(null)

  useEffect(() => {
    if (value) {
      const parsed = parseHsl(value)
      setHue(parsed.h)
      setSaturation(parsed.s)
      setLightness(parsed.l)
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
    setHue(h)
    setSelectedHueBox(h)
    setSelectedGreyShade(null)
    onChange(getColorString(h, saturation, lightness))
  }

  const handleGreyShadeChange = (l: number) => {
    setSelectedGreyShade(l)
    setSelectedHueBox(-1)
    setSaturation(0)
    setLightness(l)
    onChange(getColorString(0, 0, l))
  }

  const handleSaturationChange = (s: number) => {
    setSaturation(s)
    if (s > 0) {
      setSelectedGreyShade(null)
      if (selectedHueBox === -1) {
        setSelectedHueBox(findClosestHue(hue))
      }
    }
    onChange(getColorString(hue, s, lightness))
  }

  const handleLightnessChange = (l: number) => {
    const newLightness = l
    setLightness(newLightness)
    if (saturation === 0) {
      const closestGrey = greyShades.reduce((prev, curr) =>
        Math.abs(curr - newLightness) < Math.abs(prev - newLightness) ? curr : prev
      )
      if (Math.abs(closestGrey - newLightness) <= 5) {
        setSelectedGreyShade(closestGrey)
      } else {
        setSelectedGreyShade(null)
      }
    }
    onChange(getColorString(hue, saturation, newLightness))
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