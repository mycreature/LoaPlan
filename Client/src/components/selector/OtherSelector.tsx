import { useMarketStore } from '../../stores/api/MarketStore'
import useThemeStore from '../../stores/others/ThemeStore'
import { useOtherSelectionStore } from '../../stores/selections/OtherSelectionStore'
import { getAvailableOthersByLevel } from '../../utils/expeditionDataUtils'
import { calculateGoldByDrops } from '../../utils/MarketDataUtils'
import Checkbox from '../ui/CheckBox'
import Dropdown from '../ui/DropDown'
import { OtherInfo } from '../../types/Types'

const OtherSelector = ({ SelectedCharacterInfo }: { SelectedCharacterInfo: any }) => {
  const darkMode = useThemeStore((state) => state.darkMode)
  const { toggleDrops, updateSelectionState, characterSelections } = useOtherSelectionStore()
  const refineItemInfos = useMarketStore((state) => state.refineItemInfos)

  // 선택한 캐릭터가 선택가능한 other 컨텐츠 목록 불러오기
  const availableOther = getAvailableOthersByLevel(
    parseFloat(SelectedCharacterInfo?.level.replace(/,/g, '') || '0'),
  )

  const character = characterSelections.find((c) => c.characterName === SelectedCharacterInfo.name)
  const isDouble = character?.selections.find((c) => c.isDouble)?.isDouble ?? false
  const multiplier = character?.selections.find((c) => c.multiplier)?.multiplier ?? 1

  // 선택 여부 확인 함수
  const isOtherSelected = (name: string) => {
    if (!SelectedCharacterInfo) return false

    if (!character) return false

    return character.selections.some((s) => s.name === name)
  }

  const toggleIsDouble = (value: any, isDouble: boolean) => {
    if (isOtherSelected(value.name)) {
      const info: OtherInfo = {
        name: value.name,
        type: value.type,
        level: value.level,
        drops: value.drops,
        isDouble: !isDouble,
        multiplier: multiplier,
      }

      updateSelectionState(SelectedCharacterInfo.name, info)
    }
  }

  const toggleMultiplier = (value: any, multiplier: number) => {
    if (isOtherSelected(value.name)) {
      const info: OtherInfo = {
        name: value.name,
        type: value.type,
        level: value.level,
        drops: value.drops,
        isDouble: isDouble,
        multiplier: multiplier,
      }
      updateSelectionState(SelectedCharacterInfo.name, info)
    }
  }

  return (
    <div className='mx-auto flex gap-[18px]'>
      {Object.entries(availableOther).map(([key, value]) => {
        const selected = isOtherSelected(value.name)

        const defaultDrop = value.drops
        const dropByName = character?.selections.find((s) => s.name === value.name)?.drops ?? []

        const isDoubleByName =
          character?.selections.find((s) => s.name === value.name)?.isDouble ?? false

        const multiplierByName =
          character?.selections.find((s) => s.name === value.name)?.multiplier ?? 1

        const info: OtherInfo = {
          name: value.name,
          type: value.type,
          level: value.level,
          drops: value.drops,
          isDouble: value.isDouble,
          multiplier: value.multiplier,
        }

        return (
          <div key={key} className='flex items-center'>
            <div
              className={`${darkMode ? 'border-black/20' : 'border-gray'} flex h-[185px] w-[152px] flex-shrink-0 flex-col rounded-xl border-2 p-[10px]`}
            >
              <div className='flex justify-between'>
                <h4 className='font-extrabold text-black'>{value.name}</h4>
                <h4 className='font-extrabold text-black'>{value.type}</h4>
              </div>
              <div className='mt-2 flex flex-col items-center justify-center gap-2'>
                <div className='flex w-full'>
                  <h5 className='font-bold text-black'>1수 골드 :</h5>
                  <h5 className='ml-1 font-bold text-black'>
                    {calculateGoldByDrops(defaultDrop, refineItemInfos)}G
                  </h5>
                  <div className='ml-auto h-full'>
                    <Checkbox
                      checked={selected}
                      onChange={() => toggleDrops(SelectedCharacterInfo.name, info)}
                    />
                  </div>
                </div>
                <div className='flex w-full'>
                  <h5 className='font-bold text-black'>휴식게이지 적용 </h5>
                  <div className='ml-auto h-full'>
                    <Checkbox
                      checked={isDoubleByName}
                      onChange={() => toggleIsDouble(value, isDouble)}
                    />
                  </div>
                </div>
                <div className='flex w-full justify-between gap-1'>
                  <h5 className='font-bold text-black'>시행 횟수 </h5>
                  <Dropdown
                    width={20}
                    height={20}
                    options={['1', '2', '3', '4', '5', '6', '7']}
                    onSelect={(multiplier) => toggleMultiplier(value, Number(multiplier))}
                    placeholder={multiplierByName.toString()}
                  />
                </div>
              </div>
              <div className='mt-auto flex w-full justify-end'>
                <h5 className='font-bold text-black'>종합 </h5>
                <h5 className='ml-1 font-bold text-black'>
                  {calculateGoldByDrops(dropByName, refineItemInfos).toLocaleString()}G
                </h5>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default OtherSelector
