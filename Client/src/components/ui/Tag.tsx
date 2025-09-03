import useThemeStore from '../../stores/others/ThemeStore'

interface TagProps {
  text: string
  className?: string
  width?: number | string
  height?: number | string
}

const Tag = ({ text, className = '', width = 90, height = 30 }: TagProps) => {
  const { darkMode } = useThemeStore()

  const computedWidth = typeof width === 'number' ? `${width}px` : width
  const computedHeight = typeof height === 'number' ? `${height}px` : height

  return (
    <h3
      className={`${className} flex items-center justify-center rounded-lg ${darkMode ? 'bg-black' : 'bg-green'}`}
      style={{ width: computedWidth, height: computedHeight }}
    >
      <span className='flex shrink-0'>{text}</span>
    </h3>
  )
}

export default Tag
