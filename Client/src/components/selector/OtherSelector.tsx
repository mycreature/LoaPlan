import { useState } from 'react'
import { useMarketStore } from '../../stores/api/MarketStore'
import useThemeStore from '../../stores/others/ThemeStore'
import { useOtherSelectionStore } from '../../stores/selections/OtherSelectionStore'
import { getAvailableOthersByLevel } from '../../utils/expeditionDataUtils'
import { calculateGoldByDrops } from '../../utils/MarketDataUtils'
import Checkbox from '../ui/CheckBox'
import Dropdown from '../ui/DropDown'

const OtherSelector = ({ SelectedCharacterInfo }: { SelectedCharacterInfo: any }) => {
  const darkMode = useThemeStore((state) => state.darkMode)
  const { toggleDrops, updateSelectionState, characterSelections } = useOtherSelectionStore()
  const itemInfos = useMarketStore((state) => state.itemInfos)

  // 기타 컨텐츠의 휴식 게이지 및 시행횟수 상태
  const [isDouble, setIsDouble] = useState<{ [key: string]: boolean }>({})
  const [multiplier, setMultiplier] = useState<{ [key: string]: number }>({})

  // 선택한 캐릭터가 선택가능한 other 컨텐츠 목록 불러오기
  const availableOther = getAvailableOthersByLevel(
    parseFloat(SelectedCharacterInfo?.level.replace(/,/g, '') || '0'),
  )

  const character = characterSelections.find((c) => c.characterName === SelectedCharacterInfo.name)

  // 선택 여부 확인 함수
  const isOtherSelected = (name: string) => {
    if (!SelectedCharacterInfo) return false

    if (!character) return false

    return character.selections.some((s) => s.name === name)
  }

  // 휴식게이지 및 시행횟수 상태 동기화 함수
  const handleOptionChange = (
    value: any,
    options: {
      double?: boolean
      multiplier?: number
    },
  ) => {
    const { double, multiplier: newMultiplier } = options

    const currentDouble = double ?? isDouble[value.name]
    const currentMultiplier = newMultiplier ?? (multiplier[value.name] || 1)

    // 상태 업데이트
    if (double !== undefined) {
      setIsDouble((prev) => ({
        ...prev,
        [value.name]: double,
      }))
    }

    if (newMultiplier !== undefined) {
      setMultiplier((prev) => ({
        ...prev,
        [value.name]: newMultiplier,
      }))
    }

    // store 상태도 동기화
    if (isOtherSelected(value.name)) {
      updateSelectionState(
        SelectedCharacterInfo.name,
        value.name,
        value.type,
        value.level,
        value.drops,
        currentDouble,
        currentMultiplier,
      )
    }
  }

  return (
    <div className='flex'>
      {Object.entries(availableOther).map(([key, value]) => {
        const selected = isOtherSelected(value.name)
        const doubled = isDouble[value.name] || false

        const defaultDrop = value.drops
        const currentDrop = character?.selections.find((s) => s.name === value.name)?.drops || []

        return (
          <div key={key} className='flex items-center gap-2 p-[5px]'>
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
                    {calculateGoldByDrops(defaultDrop, itemInfos)}G
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
                          doubled,
                          multiplier[value.name] || 1,
                        )
                      }
                    />
                  </div>
                </div>
                <div className='flex w-full'>
                  <h5 className='font-bold text-black'>휴식게이지 적용 </h5>
                  <div className='ml-auto h-full'>
                    <Checkbox
                      checked={doubled}
                      onChange={() => handleOptionChange(value, { double: !doubled })}
                    />
                  </div>
                </div>
                <div className='flex w-full justify-between gap-1'>
                  <h5 className='font-bold text-black'>시행 횟수 </h5>
                  <Dropdown
                    width={40}
                    height={20}
                    options={['1', '2', '3', '4', '5', '6', '7']}
                    onSelect={(v) => handleOptionChange(value, { multiplier: parseInt(v) })}
                  />
                </div>
              </div>
              <div className='mt-auto flex w-full justify-end'>
                <h5 className='font-bold text-black'>종합 </h5>
                <h5 className='ml-1 font-bold text-black'>
                  {calculateGoldByDrops(currentDrop, itemInfos).toLocaleString()}G
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
