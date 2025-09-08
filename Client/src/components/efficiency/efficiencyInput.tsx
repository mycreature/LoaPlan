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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    // 숫자만 허용, 최대 2자리
    if (/^\d{0,2}$/.test(val)) {
      onChange(val)
    }
  }

  return (
    <input
      type='text'
      value={value}
      onChange={handleChange}
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
