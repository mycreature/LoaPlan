import useThemeStore from '../../stores/ThemeStore'

interface BlockProps {
  width?: number
  height?: number
  children?: React.ReactNode
  style?: React.CSSProperties
}

const Block = ({ width, height, children, style }: BlockProps) => {
  const { darkMode } = useThemeStore()

  return (
    <div
      className={`flex items-center justify-center rounded-lg ${darkMode ? 'bg-gray' : 'bg-white'}`}
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
