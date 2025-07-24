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

  const handleClick = (name: string) => {
    setSelectedCharacter(name)
  }

  return (
    <div className=''>
      {expeditionLoading && (!expeditions || expeditions.length === 0) ? (
        <div className='flex justify-center'>
          <Loading />
        </div>
      ) : Array.isArray(expeditions) && expeditions.length > 0 ? (
        <div className='flex flex-col gap-[5px]'>
          {expeditions.slice(0, 6).map((character, index) => {
            const isSelected = selectedCharacter === character.name

            return (
              <div
                key={index}
                onClick={() => handleClick(character.name)}
                className={`flex h-12 cursor-pointer items-center gap-6 rounded-lg border-3 px-6 ${
                  isSelected ? 'border-green' : darkMode ? 'border-black/20' : 'border-gray'
                }`}
              >
                <img
                  src={`/icons/class/${character.class}.svg`}
                  alt='avatar'
                  className='h-9 w-9 rounded-full'
                />
                <h3 className='w-full truncate overflow-hidden whitespace-nowrap text-black'>
                  {character.name}
                </h3>
                {islevel ? (
                  <h3 className='text-black'>{Number(character.level.replace(/,/g, ''))}</h3>
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
