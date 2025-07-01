import { Link } from 'react-router-dom'
import useThemeStore from '../stores/others/ThemeStore'
import { requestLogOut } from '../api/userApi'
import Sidebar from '../components/ui/Sidebar'
import { useState } from 'react'

const Header = () => {
  // user: 로그인 된 사용자 정보
  // darkMode: 다크모드 활성화 여부
  // toggleDarkMode: 다크모드를 온오프 함수
  const { darkMode, toggleDarkMode } = useThemeStore()
  const isLogin = !!localStorage.getItem('token')
  const isGuest = !!sessionStorage.getItem('guest-storage')

  const navLinks = [
    { to: '/charts', label: '시세차트' },
    { to: '/Spec', label: '스펙효율' },
    { to: '/Investment', label: '투자효율' },
    { to: '/Weekly', label: '주간골드' },
  ]

  const [isOpen, setIsOpen] = useState(false)
  const toggleSideOpen = () => setIsOpen((isOpen) => !isOpen)
  const closeSidebar = () => setIsOpen(false)

  const handleLogout = () => {
    try {
      requestLogOut()
      window.location
    } catch (error) {
      console.error('로그아웃 실패:', error)
      throw error
    } finally {
      window.location.replace('/login')
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 z-50 h-[50px] w-full transition-colors ${darkMode ? 'bg-black' : 'bg-green'}`}
    >
      <div className='h-full w-full'>
        {/* 로고 */}
        <div className='flex h-full items-center'>
          <Link to='/' className='flex h-full items-center pr-11'>
            <h1 className='pl-4 text-white'>LOAPLAN</h1>
          </Link>

          {/* 해더바 메뉴들 */}
          <nav className='hidden space-x-11 pr-6 lg:flex'>
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className='flex h-full items-center whitespace-nowrap'>
                <h2 className='pl-2 text-white'>{label}</h2>
              </Link>
            ))}
          </nav>
          <div className='mr-7 ml-auto flex items-center space-x-5'>
            {/* 다크모드 토글 버튼 */}
            <button
              onClick={toggleDarkMode}
              className={`hidden rounded-full border-2 border-white p-2 lg:flex ${darkMode ? 'bg-black' : 'bg-green'}`}
            >
              {darkMode ? (
                <svg className='h-5 w-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z' />
                </svg>
              ) : (
                <svg className='h-5 w-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
                </svg>
              )}
            </button>

            {/* 계정 링크 */}
            <div className='hidden items-center justify-center lg:flex'>
              <Link to='/Userinfo' className='flex h-7 w-7 items-center'>
                <img src='/icons/avatar.svg' alt='avatar' className='h-full w-full rounded-full' />
              </Link>
            </div>

            {/* 로그아웃 버튼 */}
            <div className='hidden items-center justify-center lg:flex'>
              <button className='h-7 w-7 border-none bg-transparent p-0'>
                <img
                  src='/icons/logout.svg'
                  alt='logout'
                  className='h-full w-full'
                  onClick={handleLogout}
                />
              </button>
            </div>
            {/* 사이드바 메뉴 (햄버거 메뉴)*/}
            <button
              className='m-0 border-none bg-transparent p-0 lg:hidden'
              onClick={toggleSideOpen}
              style={{ display: 'inline-flex' }}
            >
              <img src='/icons/hamburgerMenu.svg' className='h-7 w-7' alt='menu' />
            </button>
            {/* 사이드바 요소*/}
            <Sidebar isOpen={isOpen} onClose={closeSidebar}>
              <ul className='space-y-[20px]'>
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className='flex h-full items-center border-b border-white/30 whitespace-nowrap'
                  >
                    <h3 className='pl-2 text-white'>{label}</h3>
                  </Link>
                ))}
                {/* 사이드바 프로필 이동 링크*/}
                <Link
                  to='/userinfo'
                  className='flex h-full items-center border-b border-white/30 whitespace-nowrap'
                >
                  <h3 className='pl-2 text-white'>프로필</h3>
                </Link>
                {/* 로그인 / 로그아웃 버튼 */}
                {isLogin == true || isGuest == true ? (
                  <button className='m-0 border-none bg-transparent p-0' onClick={handleLogout}>
                    <h3 className='pl-2 text-white'>로그아웃</h3>
                  </button>
                ) : (
                  <Link
                    to='/login'
                    className='flex h-full items-center border-b border-white/30 whitespace-nowrap'
                  >
                    <h3 className='pl-2 text-white'>로그인</h3>
                  </Link>
                )}

                <div
                  className={
                    'mt-7 flex items-center justify-center space-x-5 rounded-3xl border border-white py-1.5'
                  }
                >
                  <label className=''>
                    {/* 사이드바 다크모드 아이콘 (라벨) */}
                    {darkMode ? (
                      <svg className='h-5 w-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                        <path d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z' />
                      </svg>
                    ) : (
                      <svg
                        className='text-w h-5 w-5 text-white'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
                      </svg>
                    )}
                  </label>
                  {/* 사이드바 다크모드 스위치 */}
                  <button
                    onClick={toggleDarkMode}
                    className={`relative h-6 w-12 rounded-full transition-colors duration-300 ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        darkMode ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></span>
                  </button>
                </div>
              </ul>
            </Sidebar>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
