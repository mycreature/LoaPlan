import useThemeStore from '../../stores/others/ThemeStore'

interface BlockProps {
  title: string
  padding?: number
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
  title,
  padding = 16,
  width,
  height,
  children,
  style,
  className = '',
  mode = true,
  darkColor = 'bg-gray',
  lightColor = 'bg-white',
}: BlockProps) => {
  const { darkMode } = useThemeStore()

  return (
    <div
      className={` ${mode ? (darkMode ? `${darkColor}` : `${lightColor}`) : ''} ' ${className} mt-0 flex flex-col items-center justify-center gap-5 overflow-hidden rounded-lg`}
      style={{
        ...style,
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        flexShrink: 0,
        padding: padding ? `${padding}px` : undefined,
      }}
    >
      <h3 className='w-full leading-none font-extrabold text-black'>{title}</h3>
      <div className='h-full w-full'>{children}</div>
    </div>
  )
}

export default Block
