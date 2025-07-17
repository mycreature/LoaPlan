import React from 'react'
import useThemeStore from '../../stores/others/ThemeStore'

interface CheckboxProps {
  width?: string
  height?: string
  checked?: boolean
  tabIndex?: number
  onChange?: (checked: boolean) => void
}

const Checkbox = ({
  width = '20px',
  height = '20px',
  checked = false,

  onChange,
}: CheckboxProps) => {
  const darkMode = useThemeStore((state) => state.darkMode)

  // 모든 이벤트를 컴포넌트 내부에서 처리
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // 체크박스 상태 변경
    onChange?.(!checked)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // 스페이스바나 엔터키로 체크박스 토글
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      onChange?.(!checked)
    }
  }

  return (
    <label
      style={{
        width,
        height,
        backgroundColor: darkMode ? '#282828' : '#4bd66e',
        outline: 'none',
      }}
      className='flex cursor-pointer rounded-md transition-colors duration-200'
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
    >
      <input
        type='checkbox'
        checked={checked}
        onChange={() => {}}
        className='sr-only'
        onClick={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
        onKeyDown={(e) => e.preventDefault()}
      />
      <div className='flex h-full w-full items-center justify-center rounded-md border-2 border-white'>
        {checked && (
          <svg
            className='h-3 w-3 text-white'
            fill='none'
            stroke='currentColor'
            strokeWidth='3'
            viewBox='0 0 24 24'
          >
            <path d='M5 13l4 4L19 7' />
          </svg>
        )}
      </div>
    </label>
  )
}

export default Checkbox
