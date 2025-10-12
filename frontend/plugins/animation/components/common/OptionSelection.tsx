

export const OptionSelection = ({options, setValue, value, label}: {options: string[], setValue: (value: string) => void, value: string, label?: string}) => {
  
  return (
    <div>
      {label && <div className="option-selection-label">{label}</div>}
      <div className="option-selection">
        {options?.map((option) => (
          <div key={option} className={`option-selection-item ${value === option ? 'selected' : ''}`} onClick={() => setValue(option)}>
            {option}
          </div>
        ))}
      </div>
    </div>
  )
}

