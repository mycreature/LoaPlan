import { useRef } from 'react'

import { useCharacterSelectionStore } from '../../stores/selections/CharacterSelectionStore'
import { getAvailableRaidsByLevel } from '../../utils/expeditionDataUtils'
import { raidGoldTable } from '../../constants/goldRaidTable'
import Button from '../ui/Button'
import useThemeStore from '../../stores/others/ThemeStore'
import Checkbox from '../ui/CheckBox'
import { useRaidSelectionStore } from '../../stores/selections/RaidSelectionStore'

const RaidSelector = () => {
  const SelectedCharacterInfo = useCharacterSelectionStore((state) => state.SelectedCharacterInfo)
  const darkMode = useThemeStore((state) => state.darkMode)
  const { toggleGate, characterSelections } = useRaidSelectionStore()

  const sliderRef = useRef<HTMLDivElement>(null)
  const slideWidth = 458

  // ✅ Store에서 현재 캐릭터의 선택 상태를 가져오는 함수
  const isGateSelected = (raidName: string, type: string, gate: number) => {
    if (!SelectedCharacterInfo) return false

    const character = characterSelections.find(
      (c) => c.characterName === SelectedCharacterInfo.name,
    )
    if (!character) return false

    const raid = character.selections.find((s) => s.raidName === raidName && s.type === type)
    return raid ? raid.gates.includes(gate) : false
  }

  const availableRaid = getAvailableRaidsByLevel(
    parseFloat(SelectedCharacterInfo?.level.replace(/,/g, '')),
  )

  // ✅ 한 번의 순회로 그룹핑까지 완료
  const groupedRaidGates = availableRaid.reduce(
    (acc, raid) => {
      const raidData = raidGoldTable.find((r) => r.name === raid.raidName)
      const typeData = raidData?.type.find((t) => t.type === raid.type)

      if (!typeData?.gates) return acc

      const key = `${raid.raidName}-${raid.type}`

      acc[key] = typeData.gates.map((gate) => ({
        raidName: raid.raidName,
        type: raid.type,
        gate: gate.gate,
        gold: gate.gold,
      }))

      return acc
    },
    {} as Record<
      string,
      Array<{
        raidName: string
        type: any
        gate: number
        gold: number
      }>
    >,
  )

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -slideWidth, behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: slideWidth, behavior: 'smooth' })
    }
  }

  return (
    <div className='flex w-[456px] flex-col'>
      <div
        ref={sliderRef}
        className='scrollbar-hide flex w-[456px] flex-row gap-4 overflow-hidden scroll-smooth'
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {Object.entries(groupedRaidGates)
          .map(([key, gates]) => {
            const [raidName, type] = key.split('-')
            const totalGold = gates.reduce((sum, g) => sum + g.gold, 0)

            return (
              <div
                key={key}
                className={`${darkMode ? 'border-black/20' : 'border-gray'} flex h-[185px] w-[140px] flex-shrink-0 flex-col rounded-xl border-2 p-[10px]`}
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className='flex justify-between'>
                  <h4 className='font-extrabold text-black'>{raidName}</h4>
                  <h4 className={`font-extrabold ${type === '하드' ? 'text-red' : 'text-black'}`}>
                    {type}
                  </h4>
                </div>

                <div className='mt-1 flex-grow items-center'>
                  {gates.map((g) => {
                    const isChecked = isGateSelected(g.raidName, g.type, g.gate)
                    return (
                      <div key={g.gate} className='mt-2 flex items-center justify-center'>
                        <h5 className='font-bold text-black'>{g.gate}관문 : </h5>
                        <h5 className='ml-1 font-bold text-black'>{g.gold.toLocaleString()}G</h5>
                        <div className='ml-auto h-full'>
                          <Checkbox
                            checked={isChecked}
                            onChange={() => {
                              toggleGate(SelectedCharacterInfo.name, g.raidName, g.type, g.gate)
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className='mt-auto flex justify-end'>
                  <h5 className='mr-1 font-bold text-black'>종합</h5>
                  <h5 className='font-bold text-black'>{totalGold.toLocaleString()}G</h5>
                </div>
              </div>
            )
          })
          .reverse()}
      </div>
      <div className='mt-3 flex h-10 justify-center gap-4'>
        <Button
          text='◀ 이전'
          className='h-full'
          textClass='text-sm font-extrabold'
          onClick={handlePrev}
        />
        <Button
          text='다음 ▶'
          className='h-full'
          textClass='text-sm font-extrabold'
          onClick={handleNext}
        />
      </div>
      )
    </div>
  )
}

export default RaidSelector
