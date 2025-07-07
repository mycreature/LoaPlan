import { useRef, useState } from 'react'

import { useCharacterSelectionStore } from '../../stores/selections/CharacterSelectionStore'
import { getAvailableRaidsByLevel } from '../../utils/expeditionDataUtils'
import { raidGoldTable } from '../../constants/goldRaidTable'
import Button from '../ui/Button'
import useThemeStore from '../../stores/others/ThemeStore'
import Checkbox from '../ui/CheckBox'
import { useRaidSelectionStore } from '../../stores/selections/RaidSelectionStore'
import Modal from '../ui/Modal'

const RaidSelector = () => {
  const SelectedCharacterInfo = useCharacterSelectionStore((state) => state.SelectedCharacterInfo)
  const darkMode = useThemeStore((state) => state.darkMode)
  const { toggleGate, characterSelections } = useRaidSelectionStore()

  const sliderRef = useRef<HTMLDivElement>(null)
  const slideWidth = 670
  const maxSelections = 3

  // Modal 상태관리
  const [open, isOpen] = useState(false)

  const handleToggleModal = () => {
    isOpen((prev) => !prev)
  }

  const isGateSelected = (raidName: string, type: string, gate: number) => {
    if (!SelectedCharacterInfo) return false

    const character = characterSelections.find(
      (c) => c.characterName === SelectedCharacterInfo.name,
    )
    if (!character) return false

    const raid = character.selections.find((s) => s.raidName === raidName && s.type === type)
    return raid ? raid.gates.includes(gate) : false
  }

  const canSelectGate = (raidName: string, gate: number) => {
    if (!SelectedCharacterInfo) return false

    const character = characterSelections.find(
      (c) => c.characterName === SelectedCharacterInfo.name,
    )
    if (!character) return true

    const isCurrentRaidSelected = character.selections.some((s) => s.raidName === raidName)

    // ❌ 같은 raidName에서 중복된 gate 번호가 있으면 불가
    const isGateConflict = character.selections.some(
      (s) => s.raidName === raidName && s.gates.includes(gate),
    )
    if (isGateConflict) return false

    // ✅ 이미 선택된 레이드는 항상 허용
    if (isCurrentRaidSelected) return true

    const currentRaidCount = new Set(character.selections.map((s) => s.raidName)).size
    if (currentRaidCount >= maxSelections) return false

    return true
  }

  const handleGateToggle = (raidName: string, type: any, gate: number) => {
    if (!SelectedCharacterInfo) return

    const isSelected = isGateSelected(raidName, type, gate)

    if (isSelected) {
      toggleGate(SelectedCharacterInfo.name, raidName, type, gate)
      return
    }

    if (canSelectGate(raidName, gate)) {
      toggleGate(SelectedCharacterInfo.name, raidName, type, gate)
    }
  }

  const availableRaid = getAvailableRaidsByLevel(
    parseFloat(SelectedCharacterInfo?.level.replace(/,/g, '') || '0'),
  )

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
    {} as Record<string, Array<{ raidName: string; type: string; gate: number; gold: number }>>,
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
    <div className='flex w-full flex-col'>
      <div
        ref={sliderRef}
        className='scrollbar-hide flex flex-row gap-5 overflow-hidden scroll-smooth'
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {Object.entries(groupedRaidGates)
          .map(([key, gates]) => {
            const [raidName, type] = key.split('-')
            const totalGold = gates.reduce((sum, g) => sum + g.gold, 0)

            return (
              <div
                key={key}
                className={`${darkMode ? 'border-black/20' : 'border-gray'} flex h-[185px] w-[152px] flex-shrink-0 flex-col rounded-xl border-2 p-[10px]`}
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
                        <h5 className='font-bold text-black'>{g.gate}관문 :</h5>
                        <h5 className='ml-1 font-bold text-black'>{g.gold.toLocaleString()}G</h5>
                        <div className='ml-auto h-full'>
                          <Checkbox
                            checked={isChecked}
                            onChange={() => handleGateToggle(g.raidName, g.type, g.gate)}
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
        <Button
          text='기타 컨텐츠'
          className='h-full'
          textClass='text-sm font-extrabold'
          onClick={handleToggleModal}
        />
        <Modal onClose={handleToggleModal} open={open}>
          <div>
            <h3> 테스트</h3>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default RaidSelector
