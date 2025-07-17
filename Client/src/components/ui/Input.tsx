import useThemeStore from '../../stores/others/ThemeStore'

interface InputProps {
  value?: string
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  className?: string
  error?: string
  disabled?: boolean
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
}: InputProps) => {
  const { darkMode } = useThemeStore()

  return (
    <input
      type={type}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`rounded-lg border-[1px] bg-none px-3 py-2 text-black ${!error ? (darkMode ? 'border-black' : 'border-gray') : 'border-red'} ${className} ${disabled ? `${darkMode ? 'opacity-25' : 'bg-gray'} cursor-not-allowed` : ''}`}
    />
  )
}

export default Input
