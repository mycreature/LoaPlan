import useThemeStore from '../../stores/ThemeStore'

interface BlockProps {
  width?: number
  height?: number
  children?: React.ReactNode
  style?: React.CSSProperties
  mode?: boolean
  className?: string
  darkColor?: string
  lightColor?: string
}

const Block = ({
  width,
  height,
  children,
  style,
  className,
  mode = true,
  darkColor = 'bg-gray',
  lightColor = 'bg-white',
}: BlockProps) => {
  const { darkMode } = useThemeStore()

  return (
    <div
      className={` ${mode ? (darkMode ? `${darkColor}` : `${lightColor}`) : ''} ${className ? className : 'flex items-center justify-center overflow-hidden rounded-lg'} `}
      style={{
        ...style,
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  )
}

export default Block
