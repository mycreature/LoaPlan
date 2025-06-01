import useThemeStore from '../../stores/ThemeStore'

interface InputProps {
  value?: string
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  className?: string
}

const Input = ({ value, onBlur, placeholder = '', type = 'text', className = '' }: InputProps) => {
  const { darkMode } = useThemeStore()

  return (
    <input
      type={type}
      value={value}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`rounded-lg border-1 bg-none px-3 py-2 ${darkMode ? 'border-black' : 'border-gray'} ${className}`}
    />
  )
}

export default Input
