import useThemeStore from '../../stores/others/ThemeStore'

interface InputProps {
  value?: string | number
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  pattern?: string
  type?: string
  className?: string
  error?: string
  disabled?: boolean
  width?: number
  height?: number
}

const Input = ({
  value,
  onBlur,
  onChange,
  placeholder = '',
  type = 'text',
  className = '',
  error = '',
  disabled = false,
  pattern = '',
  width,
  height,
}: InputProps) => {
  const { darkMode } = useThemeStore()

  return (
    <input
      type={type}
      value={value}
      pattern={pattern}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '40px' }}
      className={`h-10 rounded-lg border-[1px] bg-none px-3 py-2 text-black ${!error ? (darkMode ? 'border-black' : 'border-gray') : 'border-red'} ${className} ${disabled ? `${darkMode ? 'opacity-25' : 'bg-gray'} cursor-not-allowed` : ''}`}
    />
  )
}

export default Input
