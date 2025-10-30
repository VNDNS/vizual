import { useState } from "react"

interface ColorPickerProps {
  onChange: (color: string) => void
}

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(50)
  const [lightness, setLightness] = useState(50)

  const hues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]

  const getColorString = (h: number, s: number, l: number) => {
    return `hsl(${h}, ${s}%, ${l}%)`
  }

  const handleHueChange = (h: number) => {
    setHue(h)
    onChange(getColorString(h, saturation, lightness))
  }

  const handleSaturationChange = (s: number) => {
    setSaturation(s)
    onChange(getColorString(hue, s, lightness))
  }

  const handleLightnessChange = (l: number) => {
    setLightness(l)
    onChange(getColorString(hue, saturation, l))
  }

  return (
    <div className="color-picker">
      <div className="color-picker-hue-boxes">
        {hues.map((h) => (
          <div
            key={h}
            className={`color-picker-hue-box ${hue === h ? 'selected' : ''}`}
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