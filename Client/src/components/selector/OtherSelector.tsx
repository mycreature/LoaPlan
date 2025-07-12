import useThemeStore from '../../stores/others/ThemeStore'
import { useOtherSelectionStore } from '../../stores/selections/OtherSelectionStore'
import { getAvailableOthersByLevel } from '../../utils/expeditionDataUtils'
import Checkbox from '../ui/CheckBox'

const OtherSelector = ({ SelectedCharacterInfo }: { SelectedCharacterInfo: any }) => {
  const darkMode = useThemeStore((state) => state.darkMode)
  const { toggleDrops, characterSelections } = useOtherSelectionStore()

  const availableOther = getAvailableOthersByLevel(
    parseFloat(SelectedCharacterInfo?.level.replace(/,/g, '') || '0'),
  )

  // 선택 여부 확인 함수
  const isOtherSelected = (name: string) => {
    if (!SelectedCharacterInfo) return false

    const character = characterSelections.find(
      (c) => c.characterName === SelectedCharacterInfo.name,
    )
    if (!character) return false

    return character.selections.some((s) => s.name === name)
  }

  return (
    <div
      className={`${
        darkMode ? 'border-black/20' : 'border-gray'
      } flex w-full flex-col gap-2 rounded-xl border-2 p-[10px]`}
    >
      {Object.entries(availableOther).map(([key, value]) => {
        const selected = isOtherSelected(value.name)

        return (
          <div key={key} className='flex items-center justify-between p-[10px]'>
            <h4 className='text-black'>{value.name}</h4>
            <Checkbox
              checked={selected}
              onChange={() =>
                toggleDrops(
                  SelectedCharacterInfo.name,
                  value.name,
                  value.type,
                  value.level,
                  value.drops,
                )
              }
            />
          </div>
        )
      })}
    </div>
  )
}

export default OtherSelector
