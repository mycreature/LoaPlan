import useThemeStore from '../../stores/others/ThemeStore'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

const Sidebar = ({ isOpen = false, onClose, children }: SidebarProps) => {
  const { darkMode } = useThemeStore()

  // 사이드바가 열렸을 때만 오버레이를 보이게
  return (
    <>
      {/* 오버레이: 사이드바 외 영역 클릭 시 닫기 */}
      {isOpen && (
        <div
          className='bg-opacity-50 fixed inset-0 z-10 bg-gray-500 opacity-50'
          onClick={onClose}
          aria-hidden='true'
        />
      )}

      <div
        className={`fixed top-0 right-0 z-20 h-full w-[200px] rounded-l-xl shadow-xl ${
          darkMode ? 'bg-gray-700' : 'bg-green'
        } transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* 사이드 메뉴 내용 */}
        <ul className='px-5 pt-10'>{children}</ul>
      </div>
    </>
  )
}

export default Sidebar
