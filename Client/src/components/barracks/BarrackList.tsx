import { useExpeditionStore } from '../../stores/api/ExpeditionStore'
import useThemeStore from '../../stores/others/ThemeStore'
import Loading from '../ui/Loading'

interface BarrackListProps {
  islevel?: boolean
}

const BarrackList = ({ islevel = true }: BarrackListProps) => {
  const expeditionLoading = useExpeditionStore((state) => state.expeditionLoading)
  const expeditions = useExpeditionStore((state) => state.expeditions)

  const darkMode = useThemeStore((state) => state.darkMode)

  return (
    <div className='w-[80%]'>
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
                darkMode ? 'border-black/30' : 'border-gray'
              }`}
            >
              <img
                src={`/icons/class/${character.class}.svg`}
                alt='avatar'
                width={40}
                height={40}
                className='mr-[35px] rounded-full'
              />
              <h3 className='w-[200px] max-w-[200px] truncate overflow-hidden whitespace-nowrap text-black'>
                {character.name}
              </h3>
              {islevel ? (
                <h3 className='ml-auto text-black'>{Number(character.level.replace(/,/g, ''))}</h3>
              ) : (
                ''
              )}
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
