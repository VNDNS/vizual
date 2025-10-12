

export const OptionSelection = ({options, setValue, value, label}: {options: any[], setValue: (value: string) => void, value: any, label?: string}) => {
  
  return (
    <div>
      {label && <div className="option-selection-label">{label}</div>}
      <div className="option-selection">
        {options?.map((option) => (
            <div key={option.id} className={`option-selection-item ${value === option.id ? 'selected' : ''}`} onClick={() => setValue(option.id)}>
              {option.name}
          </div>
        ))}
      </div>
    </div>
  )
}

