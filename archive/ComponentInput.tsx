export const ComponentInput = ({ label, value, onChange }: { label: string, value: number | string, onChange: any }) => {
  return (
    <div className="component-configuration-signal">
      <span>{label}</span>
      {typeof value === "number" ?
        <input type="number" value={value} step="60" onChange={(e) => onChange(Number(e.target.value))} />
      :
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      }
    </div>
  )
}