import React from 'react'
import useThemeStore from '../../stores/ThemeStore'

interface ButtonProps {
  text?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  text = '',
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}) => {
  const { darkMode } = useThemeStore()

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg- rounded-lg px-6 py-2 text-white ${darkMode ? `bg-black` : `bg-green`} ${className} `}
    >
      <h3>{text}</h3>
    </button>
  )
}

export default Button
