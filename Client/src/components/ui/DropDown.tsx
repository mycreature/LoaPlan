import { useState } from 'react'
import useThemeStore from '../../stores/others/ThemeStore'

interface DropdownProps {
  width: number
  height: number
  options: string[]
  onSelect: (value: string) => void
  placeholder?: string
}

const Dropdown = ({ width, height, options, onSelect, placeholder = '' }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const darkMode = useThemeStore((state) => state.darkMode)

  const handleSelect = (option: string) => {
    setSelected(option)
    onSelect(option)
    setIsOpen(false)
  }

  return (
    <div style={{ width, height, position: 'relative' }}>
      <div
        className={`flex h-full w-full cursor-pointer items-center justify-between rounded border-2 p-2 ${darkMode ? 'border-black/20' : 'border-gray'}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h5 className='flex shrink-0 justify-center font-bold text-black'>
          {selected || placeholder}
        </h5>
      </div>

      {isOpen && (
        <div className='border-gray/70 border'>
          {options.map((option) => (
            <h5
              key={option}
              className='bg-white p-2 font-bold text-black'
              onClick={() => handleSelect(option)}
            >
              {option}
            </h5>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
