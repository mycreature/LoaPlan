import { useNavigate } from 'react-router-dom'
import useThemeStore from '../stores/others/ThemeStore'
import { requestLogOut } from '../api/userApi'
import Sidebar from '../components/ui/Sidebar'
import { useState } from 'react'
import { getAuthStatus } from '../hook/useAuthRedirect'
import Modal from '../components/ui/Modal'
import FAQ from '../components/etc/FAQ'

const Header = () => {
  // user: 로그인 된 사용자 정보
  // darkMode: 다크모드 활성화 여부
  // toggleDarkMode: 다크모드를 온오프 함수
  const { darkMode, toggleDarkMode } = useThemeStore()
  const { isGuest, isLogin, isLocal } = getAuthStatus()

  const navLinks = [
    { to: '/charts', label: '시세차트', disabled: true },
    { to: '/weekly-gold', label: '주간골드', disabled: false },
    { to: '/time-efficiency', label: '시간효율', disabled: false },
    // { to: '/gold-efficiency', label: '골드효율', disabled: true },
  ]

  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const toggleIsOpen = () => setIsOpen((isOpen) => !isOpen)
  const closeSidebar = () => setIsOpen(false)

  const [FAQstate, setFAQ] = useState(false)
  const toogleFAQ = () => setFAQ((isOpen) => !isOpen)
  const closeFAQ = () => setFAQ(false)

  const handleLogout = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?')
    if (!confirmLogout) return

    try {
      requestLogOut()
    } catch (error) {
      console.error('로그아웃 실패:', error)
      throw error
    } finally {
      window.location.replace('/login')
    }
  }

  const handleUndevelopedClick = (disabled: boolean, link: string) => {
    if (disabled) {
      alert('이 기능은 현재 개발 중입니다. 빠른 시일 내에 개발하겠습니다.')
    } else {
      if (!isLogin && !isGuest && !isLocal) {
        navigate('/login')
        return
      }

      navigate(link)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 z-50 h-[50px] w-full transition-colors ${darkMode ? 'bg-black' : 'bg-green'}`}
    >
      <div className='flex h-full items-center px-7'>
        <Modal open={FAQstate} onClose={closeFAQ}>
          <FAQ />
        </Modal>
        {/* 로고 */}
        <div className='mr-13 flex shrink-0 items-center gap-2'>
          <button
            className='flex bg-transparent p-0 whitespace-nowrap'
            onClick={() => handleUndevelopedClick(false, '/')}
          >
            <h1 className='h-[38px] w-[157px] text-white'>LOAPLAN</h1>
          </button>
          <h4 className='flex w-13 justify-center rounded-4xl border border-white text-white'>
            Beta
          </h4>
        </div>

        {/* 해더바 메뉴들 */}
        <nav className='hidden gap-10 lg:flex lg:items-center'>
          {navLinks.map(({ to, label, disabled }) => (
            <button
              key={to}
              onClick={() => handleUndevelopedClick(disabled, to)}
              className='flex h-[39px] w-[91px] items-center bg-transparent p-0 whitespace-nowrap'
            >
              <h2 className='w-[91px] text-white'>{label}</h2>
            </button>
          ))}
        </nav>
        <div className='mr-0 ml-auto flex gap-5'>
          <button
            onClick={toogleFAQ}
            className='hidden items-center justify-center rounded-full border-2 border-white bg-transparent p-2 lg:flex'
          >
            <svg
              className='h-5 w-5 scale-170 text-white'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M12 17.25h.01'
              />
            </svg>
          </button>

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
          {isLogin == true || isLocal == true ? (
            <div className='hidden items-center justify-center lg:flex'>
              <button
                onClick={() => navigate('/userinfo')}
                className='flex h-8 w-8 items-center border-none bg-transparent p-0'
              >
                <img src='/icons/avatar.svg' alt='avatar' className='h-full w-full rounded-full' />
              </button>
            </div>
          ) : null}

          {/* 로그아웃 버튼 */}
          <div className='hidden items-center justify-center lg:flex'>
            <button className='h-8 w-8 border-none bg-transparent p-0'>
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
            className='m-0 h-8 w-8 border-none bg-transparent p-0 lg:hidden'
            onClick={toggleIsOpen}
            style={{ display: 'inline-flex' }}
          >
            <img src='/icons/hamburgerMenu.svg' alt='menu' />
          </button>
          {/* 사이드바 요소*/}
          <Sidebar isOpen={isOpen} onClose={closeSidebar}>
            <ul className='flex flex-col gap-5'>
              {navLinks.map(({ to, label, disabled }) => (
                <button
                  key={to}
                  onClick={() => handleUndevelopedClick(disabled, to)}
                  className='flex h-full items-center border-b border-none border-white/30 bg-transparent p-0 whitespace-nowrap'
                >
                  <h3 className='pl-2 text-white'>{label}</h3>
                </button>
              ))}
              {/* 사이드바 프로필 이동 링크*/}
              {isLogin == true || isLocal == true ? (
                <button
                  onClick={() => navigate('/Userinfo')}
                  className='flex h-full items-center border-b border-none border-white/30 bg-transparent p-0 whitespace-nowrap'
                >
                  <h3 className='pl-2 text-white'>프로필</h3>
                </button>
              ) : null}
              {/* FAQ 버튼 */}
              <button
                onClick={() => {
                  toogleFAQ()
                }}
                className='flex h-full w-full items-center border-none bg-transparent p-0 whitespace-nowrap'
              >
                <h3 className='pl-2 text-white'>FAQ</h3>
              </button>

              {/* 로그인 / 로그아웃 버튼 */}
              {isLogin == true || isGuest == true || isLocal == true ? (
                <button
                  className='flex h-full w-full items-center border-none bg-transparent p-0 whitespace-nowrap'
                  onClick={handleLogout}
                >
                  <h3 className='pl-2 text-white'>로그아웃</h3>
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate('/login')
                  }}
                  className='flex h-full w-full items-center border-none bg-transparent p-0 whitespace-nowrap'
                >
                  <h3 className='pl-2 text-white'>로그인</h3>
                </button>
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
    </header>
  )
}

export default Header
