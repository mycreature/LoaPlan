import useThemeStore from '../../stores/ThemeStore'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
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
        className={`fixed top-0 right-0 z-20 h-full w-[200px] shadow-xl ${
          darkMode ? 'bg-gray-700' : 'bg-white'
        } transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* 사이드 메뉴 내용 */}
        <ul className='p-4 text-white'>
          <li>메뉴 1</li>
          <li>메뉴 2</li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
