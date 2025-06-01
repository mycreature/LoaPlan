import React from 'react'
import useThemeStore from '../../stores/ThemeStore'

interface ButtonProps {
  text?: string
  textStyle?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  mode?: boolean
}

const Button: React.FC<ButtonProps> = ({
  text = '',
  onClick,
  textStyle = '',
  type = 'button',
  className = '',
  mode = true,
}) => {
  const { darkMode } = useThemeStore()

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg px-6 py-2 ${mode ? (darkMode ? `bg-black` : `bg-green`) : ''} ${className} `}
    >
      {textStyle ? <div className={textStyle}>{text}</div> : <h3>{text}</h3>}
    </button>
  )
}

export default Button
