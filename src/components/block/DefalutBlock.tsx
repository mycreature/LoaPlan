import useStore from '../../store/store'

const DefaultBlock = () => {
  const { user, darkMode, toggleDarkMode } = useStore()

  return (
    <div
      className={`rounded-lg p-6 shadow-md transition-colors duration-300 ${
        darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-lg font-medium'>기본 블록</h3>
        <button
          onClick={toggleDarkMode}
          className='rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600'
        >
          {darkMode ? '라이트 모드' : '다크 모드'}
        </button>
      </div>

      <div className='mb-4'>
        {user ? <p>안녕하세요, {user.name}님!</p> : <p>로그인이 필요합니다</p>}
      </div>

      <div className={`rounded p-4 ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
        <p>블록 내용이 여기에 표시됩니다</p>
      </div>
    </div>
  )
}

export default DefaultBlock
