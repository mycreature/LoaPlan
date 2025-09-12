import { useEffect, useRef, useState, useCallback } from 'react'
import { getAvailableRaidsByLevel } from '../../utils/expeditionDataUtils'
import { raidGoldTable } from '../../constants/goldRaidTable'
import Button from '../ui/Button'
import useThemeStore from '../../stores/others/ThemeStore'
import Checkbox from '../ui/CheckBox'
import { useRaidSelectionStore } from '../../stores/selections/RaidSelectionStore'
import Modal from '../ui/Modal'
import OtherSelector from './OtherSelector'

interface RaidSelectorProps {
  SelectedCharacterInfo: any
}

const RaidSelector = ({
  SelectedCharacterInfo,
}: RaidSelectorProps & {
  SelectedCharacterInfo: any
}) => {
  const darkMode = useThemeStore((state) => state.darkMode)
  const { toggleGate, characterSelections } = useRaidSelectionStore()

  // 슬라이더의 보이는 영역이자
  const sliderRef = useRef<HTMLDivElement>(null)
  // 부모의 크기 영역
  const parentContainerRef = useRef<HTMLDivElement>(null)

  // 한 번에 몇 개의 카드를 넘길지 계산하기 위한 상태 (버튼 클릭 시 스크롤 양)
  const [scrollAmountPerClick, setScrollAmountPerClick] = useState(0)
  // 슬라이더 (overflow-hidden)의 최종 너비를 지정할 상태
  const [currentSliderWidth, setCurrentSliderWidth] = useState(0)

  // 카드 하나의 외부 너비 (카드 너비 + 오른쪽 gap)
  const cardOuterWidth = 152 + 18 // 카드 w: 152px, gap: 18px

  // 최대 선택 레이드
  const maxSelections = 3

  const character = characterSelections.find((c) => c.characterName === SelectedCharacterInfo.name)

  // Modal 상태관리
  const [open, isOpen] = useState(false)

  // 슬라이더의 너비와 스크롤 양을 동적으로 계산
  const calculateSliderAndScrollWidth = useCallback(() => {
    if (parentContainerRef.current) {
      const parentWidth = parentContainerRef.current.offsetWidth // 슬라이더가 배치될 부모 컨테이너의 너비

      // 부모 w 크기 기준 visible 카드 갯수 (18은 마지막 카드의 gap 제외)
      const numberOfVisibleCards = Math.floor((parentWidth + 18) / cardOuterWidth)

      // 실제 슬라이더가 보여줄 w 크기 '완전히 보이는 카드 수'만큼의 너비에서 마지막 카드의 gap을 제외
      const desiredSliderWidth =
        numberOfVisibleCards > 0 ? numberOfVisibleCards * cardOuterWidth - 18 : 0

      setCurrentSliderWidth(desiredSliderWidth)
      setScrollAmountPerClick(numberOfVisibleCards * cardOuterWidth) // 클릭 시 넘어갈 카드 묶음의 너비
    }
  }, [cardOuterWidth])

  // 캐릭터 변경 시 슬라이더 위치 초기화
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0
    }
  }, [SelectedCharacterInfo?.name])

  // 컴포넌트 마운트 및 리사이즈 시 슬라이더 너비와 스크롤 양 계산
  useEffect(() => {
    calculateSliderAndScrollWidth() // 컴포넌트 마운트 시 초기 계산

    // ResizeObserver를 사용하여 부모 컨테이너의 크기 변경 감지
    const resizeObserver = new ResizeObserver(() => {
      calculateSliderAndScrollWidth()
    })

    if (parentContainerRef.current) {
      // 부모 컨테이너를 관찰 대상으로 설정
      resizeObserver.observe(parentContainerRef.current)
    }

    // 컴포넌트 언마운트 시 옵저버 정리
    return () => {
      if (parentContainerRef.current) {
        resizeObserver.unobserve(parentContainerRef.current)
      }
    }
  }, [calculateSliderAndScrollWidth])

  const handleToggleModal = () => {
    isOpen((prev) => !prev)
  }

  const isGateSelected = (raidName: string, type: string, gate: number) => {
    if (!SelectedCharacterInfo) return false

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
    if (sliderRef.current && scrollAmountPerClick > 0) {
      sliderRef.current.scrollBy({ left: -scrollAmountPerClick, behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    if (sliderRef.current && scrollAmountPerClick > 0) {
      sliderRef.current.scrollBy({ left: scrollAmountPerClick, behavior: 'smooth' })
    }
  }

  return (
    <div ref={parentContainerRef} className='flex w-full flex-col gap-2'>
      <div
        ref={sliderRef}
        className='scrollbar-hide relative mx-auto flex flex-row gap-[18px] overflow-hidden scroll-smooth'
        style={{ width: `${currentSliderWidth}px`, scrollSnapType: 'x mandatory' }}
      >
        {Object.entries(groupedRaidGates)
          .map(([key, gates]) => {
            const [raidName, type] = key.split('-')
            const totalGold = gates.reduce((sum, g) => {
              const isChecked = isGateSelected(g.raidName, g.type, g.gate)
              return isChecked ? sum + g.gold : sum
            }, 0)

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
                  <h5 className='mr-1 font-bold text-black'>총</h5>
                  <h5 className='font-bold text-black'>{totalGold.toLocaleString()}G</h5>
                </div>
              </div>
            )
          })
          .reverse()}
      </div>
      <div className='mx-auto flex w-[322px] justify-between'>
        <Button text='이전' width={80} onClick={handlePrev} />
        <Button text='다음' width={80} onClick={handleNext} />
        <Button text='기타 컨텐츠' width={130} onClick={handleToggleModal} />
        <Modal onClose={handleToggleModal} open={open}>
          <div className='flex h-[259px] w-[370px] flex-col gap-5 p-4'>
            <h3 className='leading-none font-extrabold text-black'>기타 컨텐츠 선택</h3>
            <OtherSelector SelectedCharacterInfo={SelectedCharacterInfo} />
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default RaidSelector
