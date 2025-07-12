import { useMarketStore } from '../../stores/api/MarketStore'
import useThemeStore from '../../stores/others/ThemeStore'
import { useOtherSelectionStore } from '../../stores/selections/OtherSelectionStore'
import { getAvailableOthersByLevel } from '../../utils/expeditionDataUtils'
import { calculateGoldByDrops } from '../../utils/MarketDataUtils'
import Checkbox from '../ui/CheckBox'

const OtherSelector = ({ SelectedCharacterInfo }: { SelectedCharacterInfo: any }) => {
  const darkMode = useThemeStore((state) => state.darkMode)
  const { toggleDrops, characterSelections } = useOtherSelectionStore()
  const itemInfos = useMarketStore((state) => state.itemInfos)

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
    <div className='flex'>
      {Object.entries(availableOther).map(([key, value]) => {
        const selected = isOtherSelected(value.name)

        return (
          <div key={key} className='flex items-center gap-2 p-[5px]'>
            <div
              className={`${darkMode ? 'border-black/20' : 'border-gray'} flex h-[185px] w-[152px] flex-shrink-0 flex-col rounded-xl border-2 p-[10px]`}
            >
              <div className='flex justify-between'>
                <h4 className='font-extrabold text-black'>{value.name}</h4>
                <h4 className='font-extrabold text-black'>{value.type}</h4>
              </div>
              <div className='mt-2 flex items-center justify-center'>
                <h5 className='font-bold text-black'>1수 골드 :</h5>
                <h5 className='ml-1 font-bold text-black'>
                  {calculateGoldByDrops(value.drops, itemInfos)}G
                </h5>
                <div className='ml-auto h-full'>
                  <Checkbox
                    checked={selected}
                    onChange={() =>
                      toggleDrops(
                        SelectedCharacterInfo.name,
                        value.name,
                        value.type,
                        value.level,
                        value.drops,
                        true,
                        2,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default OtherSelector
