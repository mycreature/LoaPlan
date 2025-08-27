import useThemeStore from '../../stores/others/ThemeStore'

interface TagProps {
  text: string
  className?: string
  width?: number
  height?: number
}

const Tag = ({ text, className = '', width = 90, height = 30 }: TagProps) => {
  const { darkMode } = useThemeStore()

  return (
    <h3
      className={`${className} flex items-center justify-center rounded-lg ${darkMode ? 'bg-black' : 'bg-green'} `}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {text}
    </h3>
  )
}

export default Tag
