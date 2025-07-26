import React from 'react'
import useThemeStore from '../../stores/others/ThemeStore'

interface ButtonProps {
  text?: string | number
  textClass?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  mode?: boolean
  darkColor?: string
  lightColor?: string
  disabled?: boolean
  width?: number | string
  height?: number | string
}

const Button: React.FC<ButtonProps> = ({
  text = '',
  onClick,
  textClass: textStyle = '',
  type = 'button',
  mode = true,
  darkColor = 'bg-black',
  lightColor = 'bg-green',
  disabled = false,
  width = '80px',
  height = '40px',
}) => {
  const { darkMode } = useThemeStore()

  return (
    <button
      type={type}
      onClick={onClick}
      className={` ${mode ? (darkMode ? `${darkColor}` : `${lightColor}`) : ''} flex shrink-0 items-center justify-center rounded-lg ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
      style={{ width: `${width}`, height: `${height}` }}
      disabled={disabled}
    >
      {textStyle ? (
        <div className={textStyle}>{text}</div>
      ) : (
        <div className='text-lg font-extrabold'>{text}</div>
      )}
    </button>
  )
}

export default Button
