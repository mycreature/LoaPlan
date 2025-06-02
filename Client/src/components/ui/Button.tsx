import React from 'react'
import useThemeStore from '../../stores/ThemeStore'

interface ButtonProps {
  text?: string
  textStyle?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  mode?: boolean
  darkColor?: string
  lightColor?: string
}

const Button: React.FC<ButtonProps> = ({
  text = '',
  onClick,
  textStyle = '',
  type = 'button',
  className = '',
  mode = true,
  darkColor = 'bg-black',
  lightColor = 'bg-green',
}) => {
  const { darkMode } = useThemeStore()

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} rounded-lg px-6 py-2 ${mode ? (darkMode ? `${darkColor}` : `${lightColor}`) : ''} `}
    >
      {textStyle ? <div className={textStyle}>{text}</div> : <h3>{text}</h3>}
    </button>
  )
}

export default Button
