import { on } from 'events'
import useThemeStore from '../../stores/ThemeStore'

interface InputProps {
  value?: string
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  className?: string
}

const Input = ({
  value,
  onBlur,
  onChange,
  placeholder = '',
  type = 'text',
  className = '',
}: InputProps) => {
  const { darkMode } = useThemeStore()

  return (
    <input
      type={type}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      className={`rounded-lg border-[1px] bg-none px-3 py-2 text-black ${darkMode ? 'border-black' : 'border-gray'} ${className}`}
    />
  )
}

export default Input
