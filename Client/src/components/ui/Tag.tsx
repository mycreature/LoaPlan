import useThemeStore from '../../stores/ThemeStore'

interface TagProps {
  text: string
  className?: string
}

const Tag = ({ text, className = '' }: TagProps) => {
  const { darkMode } = useThemeStore()

  return (
    <h3 className={`flex rounded-lg px-3 ${darkMode ? 'bg-black' : 'bg-green'} ${className}`}>
      {text}
    </h3>
  )
}

export default Tag
