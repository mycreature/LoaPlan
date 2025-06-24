import { useCharacterStore } from '../../stores/CharacterStore'
import useThemeStore from '../../stores/ThemeStore'
import Loading from '../ui/Loading'

const BarrackList = () => {
  const expeditionLoading = useCharacterStore((state) => state.expeditionLoading)
  const expeditions = useCharacterStore((state) => state.expeditions)

  const darkMode = useThemeStore((state) => state.darkMode)

  return (
    <div className='w-[430px]'>
      {expeditionLoading && (!expeditions || expeditions.length === 0) ? (
        <div className='flex justify-center'>
          <Loading />
        </div>
      ) : Array.isArray(expeditions) && expeditions.length > 0 ? (
        <div className='flex flex-col gap-[6px]'>
          {expeditions.slice(1, 6).map((character, index) => (
            <div
              key={index}
              className={`flex min-h-[52px] items-center rounded-lg border pr-[27px] pl-[25px] ${
                darkMode ? 'border-white/30' : 'border-gray'
              }`}
            >
              <img
                src={`/icons/class/${character.class}.svg`}
                alt='avatar'
                className='mr-[35px] h-10 w-10 rounded-full invert'
              />
              <h3 className='w-[200px] max-w-[200px] truncate overflow-hidden whitespace-nowrap text-black'>
                {character.name}
              </h3>
              <h3 className='ml-auto text-black'>{Number(character.level.replace(/,/g, ''))}</h3>
            </div>
          ))}
        </div>
      ) : (
        // ✅ 에러 or 빈 배열
        <span></span>
      )}
    </div>
  )
}
export default BarrackList
