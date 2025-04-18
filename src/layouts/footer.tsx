import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트를 가져옵니다. 앱 내 페이지 이동을 위해 사용됩니다.
import useStore from '../store/store'; // Zustand 스토어를 가져옵니다. 전역 상태에 접근하기 위해 사용됩니다.

const Footer = () => {
  // Zustand 스토어에서 다크모드 상태를 가져옵니다.
  const { darkMode } = useStore();
  
  // 현재 연도를 계산합니다. 저작권 표시에 사용됩니다.
  const currentYear = new Date().getFullYear();

  return (
    // 푸터 컨테이너 요소입니다. 다크모드에 따라 배경색이 변경됩니다.
    <footer className={`${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white transition-colors duration-300`}>
      {/* 컨텐츠를 가운데 정렬하고 적절한 패딩을 주는 컨테이너입니다. */}
      <div className="container mx-auto px-4 py-6">
        {/* 그리드 레이아웃 - 모바일에서는 1열, 중간 화면 크기(md) 이상에서는 3열로 표시됩니다. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 왼쪽 열 - 사이트 소개 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">LoaPlan</h3>
            <p className="text-gray-300 text-sm">
              로스트아크 플레이어를 위한 효율적인 일정 관리 및 컨텐츠 계획 도구입니다.
              캐릭터별 일일, 주간 컨텐츠를 관리하고 골드 수익을 계산해보세요.
            </p>
          </div>

          {/* 가운데 열 - 빠른 링크 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">빠른 링크</h3>
            <ul className="space-y-2 text-sm">
              {/* 각 링크는 앱 내 경로로 이동합니다. */}
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-300 transition">홈</Link>
              </li>
              <li>
                <Link to="/characters" className="text-gray-300 hover:text-blue-300 transition">캐릭터 관리</Link>
              </li>
              <li>
                <Link to="/daily" className="text-gray-300 hover:text-blue-300 transition">일일 컨텐츠</Link>
              </li>
              <li>
                <Link to="/weekly" className="text-gray-300 hover:text-blue-300 transition">주간 컨텐츠</Link>
              </li>
            </ul>
          </div>

          {/* 오른쪽 열 - 외부 자료 링크 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">관련 자료</h3>
            <ul className="space-y-2 text-sm">
              {/* 각 링크는 외부 사이트로 이동합니다. target="_blank"는 새 탭에서 열기, rel="noopener noreferrer"는 보안을 위한 속성입니다. */}
              <li>
                <a 
                  href="https://lostark.game.onstove.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-300 transition flex items-center"
                >
                  <span>공식 홈페이지</span>
                  {/* 외부 링크 아이콘 */}
                  <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href="https://loawa.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-300 transition flex items-center"
                >
                  <span>로아와</span>
                  {/* 외부 링크 아이콘 */}
                  <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/mycreature/LoaPlan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-300 transition flex items-center"
                >
                  <span>GitHub</span>
                  {/* 외부 링크 아이콘 */}
                  <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 표시 - 위 영역과 경계선으로 구분됩니다. */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
          {/* 현재 연도를 동적으로 표시합니다. */}
          <p>&copy; {currentYear} LoaPlan. All rights reserved.</p>
          {/* 법적 면책 조항 */}
          <p className="mt-1">
            이 사이트는 스마일게이트 RPG와 제휴되어 있지 않으며, 로스트아크의 공식 사이트가 아닙니다.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; // Footer 컴포넌트를 외부에서 사용할 수 있도록 내보냅니다.