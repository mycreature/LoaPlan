import { useExpeditionStore } from '../../stores/api/ExpeditionStore'
import useThemeStore from '../../stores/others/ThemeStore'
import { useCharacterSelectionStore } from '../../stores/selections/CharacterSelectionStore'
import Loading from '../ui/Loading'

interface BarrackListProps {
  islevel?: boolean
}

const BarrackList = ({ islevel = true }: BarrackListProps) => {
  const expeditionLoading = useExpeditionStore((state) => state.expeditionLoading)
  const expeditions = useExpeditionStore((state) => state.expeditions)
  const darkMode = useThemeStore((state) => state.darkMode)

  const selectedCharacter = useCharacterSelectionStore((state) => state.selectedCharacterName)
  const setSelectedCharacter = useCharacterSelectionStore((state) => state.setSelectedCharacter)
  console.log(selectedCharacter)

  const handleClick = (name: string) => {
    setSelectedCharacter(name)
  }

  return (
    <div className='w-[80%]'>
      {expeditionLoading && (!expeditions || expeditions.length === 0) ? (
        <div className='flex justify-center'>
          <Loading />
        </div>
      ) : Array.isArray(expeditions) && expeditions.length > 0 ? (
        <div className='flex flex-col gap-[6px]'>
          {expeditions.slice(0, 6).map((character, index) => {
            const isSelected = selectedCharacter === character.name

            return (
              <div
                key={index}
                onClick={() => handleClick(character.name)}
                className={`flex min-h-[52px] cursor-pointer items-center rounded-lg border-3 pr-[27px] pl-[25px] ${
                  isSelected ? 'border-green' : darkMode ? 'border-black/20' : 'border-gray'
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
                  <h3 className='ml-auto text-black'>
                    {Number(character.level.replace(/,/g, ''))}
                  </h3>
                ) : (
                  ''
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <span></span>
      )}
    </div>
  )
}

export default BarrackList
