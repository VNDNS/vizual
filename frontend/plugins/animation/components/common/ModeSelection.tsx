

export const ModeSelection = ({options, setMode, mode}: {options: string[], setMode: (mode: string) => void, mode: string}) => {
  
  return (
    <div className="mode-selection">
      {options?.map((option) => (
        <div key={option} className={`mode-selection-item ${mode === option ? 'selected' : ''}`} onClick={() => setMode(option)}></div>
      ))}
    </div>
  )
}