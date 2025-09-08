interface EfficiencyInputProps {
  value: any
  onChange: any
  onBlur: any
  width?: number | string
  height?: number | string
}

export const EfficiencyInput = ({
  value,
  onChange,
  onBlur,
  width = 30,
  height = 24,
}: EfficiencyInputProps) => {
  return (
    <input
      type='text'
      pattern='[0-9]*'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => onBlur(value)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        padding: '2px 4px',
        boxSizing: 'border-box',
        fontSize: '16px',
        fontFamily: 'SUIT',
        fontWeight: 600,
        color: 'black',
        border: 'none',
        outline: 'none',
        caretColor: 'black',
      }}
    />
  )
}
