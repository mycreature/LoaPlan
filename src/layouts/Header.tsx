import { useState } from 'react'; // React의 useState 훅을 가져옵니다. 컴포넌트 내에서 상태를 관리하기 위해 사용됩니다.
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트를 가져옵니다. 페이지 간 네비게이션을 위해 사용됩니다.
import useStore from '../store/store'; // Zustand 스토어를 가져옵니다. 전역 상태 관리를 위해 사용됩니다.

const Header = () => {
  // 모바일 메뉴의 열림/닫힘 상태를 관리하는 로컬 상태입니다. 초기값은 false(닫힘)입니다.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Zustand 스토어에서 필요한 상태와 함수들을 가져옵니다.
  // user: 현재 로그인한 사용자 정보
  // darkMode: 다크모드 활성화 여부
  // toggleDarkMode: 다크모드를 켜고 끄는 함수
  const { user, darkMode, toggleDarkMode } = useStore();

  // 모바일 메뉴 토글 함수 - 메뉴의 열림/닫힘 상태를 반전시킵니다.
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    // 헤더 컨테이너 요소입니다. 다크모드에 따라 배경색이 변경됩니다.
    // className에서 ${} 문법은 템플릿 리터럴로, 조건부 스타일링을 가능하게 합니다.
    <header className={`${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white shadow-md transition-colors duration-300`}>
      {/* 컨텐츠를 가운데 정렬하고 적절한 패딩을 주는 컨테이너입니다. */}
      <div className="container mx-auto px-4 py-3">
        {/* 로고와 네비게이션 요소들을 가로로 배치하는 Flex 컨테이너입니다. */}
        <div className="flex items-center justify-between">
          {/* 로고 부분 - 클릭하면 홈으로 이동합니다. */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">LoaPlan</span>
          </Link>

          {/* 데스크톱 네비게이션 메뉴 - 중간 화면 크기(md) 이상에서만 표시됩니다. */}
          <nav className="hidden md:flex space-x-6">
            {/* 각 메뉴 항목은 Link 컴포넌트로, 클릭하면 해당 경로로 이동합니다. */}
            <Link to="/" className="hover:text-blue-300 transition">홈</Link>
            <Link to="/characters" className="hover:text-blue-300 transition">캐릭터</Link>
            <Link to="/daily" className="hover:text-blue-300 transition">일일 컨텐츠</Link>
            <Link to="/weekly" className="hover:text-blue-300 transition">주간 컨텐츠</Link>
            <Link to="/calculator" className="hover:text-blue-300 transition">계산기</Link>
          </nav>

          {/* 우측 액션 버튼들 (다크모드 토글, 로그인/프로필) - 중간 화면 크기(md) 이상에서만 표시됩니다. */}
          <div className="hidden md:flex items-center space-x-4">
            {/* 다크모드 토글 버튼 */}
            <button 
              onClick={toggleDarkMode} // 클릭 시 다크모드 토글 함수를 실행합니다.
              className="p-2 rounded-full hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle dark mode" // 접근성을 위한 라벨입니다.
            >
              {/* 현재 다크모드 상태에 따라 다른 아이콘을 표시합니다. */}
              {darkMode ? (
                // 다크모드가 활성화된 경우 - 햇빛 아이콘(라이트모드로 전환)
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                // 라이트모드가 활성화된 경우 - 달 아이콘(다크모드로 전환)
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            {/* 사용자 프로필 또는 로그인 버튼 - 로그인 상태에 따라 다르게 표시됩니다. */}
            {user ? (
              // 로그인한 경우 - 사용자 이름과 아바타 표시
              <div className="flex items-center space-x-2">
                <span className="text-sm">{user.name}</span>
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  {user.name.charAt(0)} {/* 사용자 이름의 첫 글자를 아바타로 표시 */}
                </div>
              </div>
            ) : (
              // 로그인하지 않은 경우 - 로그인 버튼 표시
              <Link to="/login" className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition">
                로그인
              </Link>
            )}
          </div>

          {/* 모바일 메뉴 버튼 - 중간 화면 크기(md) 미만에서만 표시됩니다. */}
          <div className="md:hidden flex items-center space-x-3">
            {/* 다크모드 토글 버튼 (모바일용) */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            {/* 햄버거 메뉴 버튼 - 클릭하면 모바일 메뉴가 토글됩니다. */}
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {/* 모바일 메뉴 상태에 따라 다른 아이콘을 표시합니다. */}
                {isMobileMenuOpen ? (
                  // 메뉴가 열린 경우 - X 아이콘(닫기)
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  // 메뉴가 닫힌 경우 - 햄버거 아이콘(열기)
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 네비게이션 메뉴 - 모바일 메뉴가 열린 경우에만 표시됩니다. */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-2">
            {/* 각 메뉴 항목 - 클릭하면 해당 경로로 이동하고 메뉴를 닫습니다. */}
            <Link 
              to="/" 
              className="block py-2 px-3 rounded hover:bg-gray-700 transition"
              onClick={() => setIsMobileMenuOpen(false)} // 클릭 시 메뉴를 닫습니다.
            >
              홈
            </Link>
            <Link 
              to="/characters" 
              className="block py-2 px-3 rounded hover:bg-gray-700 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              캐릭터
            </Link>
            <Link 
              to="/daily" 
              className="block py-2 px-3 rounded hover:bg-gray-700 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              일일 컨텐츠
            </Link>
            <Link 
              to="/weekly" 
              className="block py-2 px-3 rounded hover:bg-gray-700 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              주간 컨텐츠
            </Link>
            <Link 
              to="/calculator" 
              className="block py-2 px-3 rounded hover:bg-gray-700 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              계산기
            </Link>
            {/* 로그인하지 않은 경우에만 로그인 버튼을 표시합니다. */}
            {!user && (
              <Link 
                to="/login" 
                className="block py-2 px-3 rounded bg-blue-600 hover:bg-blue-700 transition mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                로그인
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; // Header 컴포넌트를 외부에서 사용할 수 있도록 내보냅니다.