export const Switch = ({ value, setValue, text }: { value: boolean, setValue: (value: boolean) => void, text: string }) => {
  return (
    <button className={` switch ${value ? 'active' : ''}`} onClick={() => setValue(!value)}>{ text }</button>
  )
}