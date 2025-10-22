import './ArrayConfiguration.scss'

export const ArrayConfiguration = ({options, setValue, value, label, onDelete}: {options: any[], setValue: (value: string) => void, value: any, label?: string, onDelete?: (id: string) => void}) => {
  
  return (
    <div className="array-configuration">
      {label && <div className="array-configuration__label">{label}</div>}
      <div className="array-configuration__list">
        {options?.map((option) => (
            <div key={option.id} className={`array-configuration__item ${value === option.id ? 'array-configuration__item--selected' : ''}`}>
              <span className="array-configuration__item-name" onClick={() => setValue(option.id)}>{option.name}</span>
              {onDelete && <button className="array-configuration__delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(option.id) }}>×</button>}
          </div>
        ))}
      </div>
    </div>
  )
}

