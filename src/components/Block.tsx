import useThemeStore from '../stores/ThemeStore'

interface BlockProps {
  width: number
  height: number
  children?: React.ReactNode
}

const Block = ({ width, height, children }: BlockProps) => {
  const { darkMode } = useThemeStore()

  return (
    <div
      className={`flex items-center justify-center rounded-lg ${darkMode ? 'bg-gray' : 'bg-white'}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  )
}

export default Block
