import useThemeStore from '../../stores/ThemeStore'

interface TagProps {
  text: string
  className?: string
}

const Tag = ({ text, className = '' }: TagProps) => {
  const { darkMode } = useThemeStore()

  return (
    <h3
      className={`flex justify-center rounded-lg ${darkMode ? 'bg-black' : 'bg-green'} ${className}`}
    >
      {text}
    </h3>
  )
}

export default Tag
