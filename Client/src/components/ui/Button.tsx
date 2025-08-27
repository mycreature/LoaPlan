import React from 'react'
import useThemeStore from '../../stores/others/ThemeStore'
import Loading from '../ui/Loading'

interface ButtonProps {
  text?: string | number
  textStyle?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  mode?: boolean
  darkColor?: string
  lightColor?: string
  disabled?: boolean
  width?: number
  height?: number
  isLoading?: boolean
}

const Button = ({
  text = '',
  onClick,
  textStyle = '',
  type = 'button',
  mode = true,
  darkColor = 'bg-black',
  lightColor = 'bg-green',
  disabled = false,
  width = 80,
  height = 40,
  isLoading = false,
}: ButtonProps) => {
  const { darkMode } = useThemeStore()

  if (isLoading)
    return (
      <div
        className='flex items-center justify-center rounded-lg'
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <Loading />
      </div>
    )

  return (
    <button
      type={type}
      onClick={onClick}
      className={` ${mode ? (darkMode ? `${darkColor}` : `${lightColor}`) : ''} flex items-center justify-center rounded-lg ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      disabled={disabled}
    >
      {textStyle ? (
        <div className={textStyle}>{text}</div>
      ) : (
        <div className='flex shrink-0 text-lg font-extrabold'>{text}</div>
      )}
    </button>
  )
}

export default Button
