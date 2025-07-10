import useThemeStore from '../../stores/others/ThemeStore'
import { useOtherSelectionStore } from '../../stores/selections/OtherSelectionStore'
import { getAvailableOthersByLevel } from '../../utils/expeditionDataUtils'
import Button from '../ui/Button'

const OtherSelector = ({ SelectedCharacterInfo }: { SelectedCharacterInfo: any }) => {
  const darkMode = useThemeStore((state) => state.darkMode)
  const { toggleDrops } = useOtherSelectionStore()

  const availableOther = getAvailableOthersByLevel(
    parseFloat(SelectedCharacterInfo?.level.replace(/,/g, '') || '0'),
  )

  return (
    <div
      className={`${darkMode ? 'border-black/20' : 'border-gray'} flex w-full flex-col gap-2 rounded-xl border-2 p-[10px]`}
    >
      {Object.entries(availableOther).map(([key, value]) => (
        <div key={key} className='flex justify-between p-[10px]'>
          <h4 className='text-black'>{value.name}</h4>
          <Button
            text='선택'
            onClick={() =>
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
      ))}
    </div>
  )
}

export default OtherSelector
