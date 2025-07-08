import useThemeStore from '../../stores/others/ThemeStore'
import { useOtherSelectionStore } from '../../stores/selections/OtherSelectionStore'
import { getAvailableOthersByLevel } from '../../utils/expeditionDataUtils'

const OtherSelector = ({ SelectedCharacterInfo }: { SelectedCharacterInfo: any }) => {
  const darkMode = useThemeStore((state) => state.darkMode)
  const { characterSelections } = useOtherSelectionStore()

  console.log('characterSelections', characterSelections)

  const availableOther = getAvailableOthersByLevel(
    parseFloat(SelectedCharacterInfo?.level.replace(/,/g, '') || '0'),
  )

  console.log('availableOther', availableOther)

  return (
    <div
      className={`${darkMode ? 'border-black/20' : 'border-gray'} flex w-full flex-col gap-2 rounded-xl border-2 p-[10px]`}
    ></div>
  )
}

export default OtherSelector
