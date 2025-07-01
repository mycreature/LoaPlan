import React from 'react'
import useThemeStore from '../../stores/others/ThemeStore'

interface ButtonProps {
  text?: string
  textClass?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  mode?: boolean
  darkColor?: string
  lightColor?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  text = '',
  onClick,
  textClass: textStyle = '',
  type = 'button',
  className = '',
  mode = true,
  darkColor = 'bg-black',
  lightColor = 'bg-green',
  disabled = false,
}) => {
  const { darkMode } = useThemeStore()

  return (
    <button
      type={type}
      onClick={onClick}
      className={` ${mode ? (darkMode ? `${darkColor}` : `${lightColor}`) : ''} ${className ? className : 'rounded-lg px-6 py-2'} ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
      disabled={disabled}
    >
      {textStyle ? <div className={textStyle}>{text}</div> : <h3>{text}</h3>}
    </button>
  )
}

export default Button
