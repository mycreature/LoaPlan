import { useState } from 'react'
import { EfficiencyInput } from './efficiencyInput'
import Checkbox from '../ui/CheckBox'
import useThemeStore from '../../stores/others/ThemeStore'
import { useContentsTimeStore } from '../../stores/selections/ContentsTimeSelectionStore'

export const ContentsTime = () => {
  const {
    isFrontline,
    isGuardian,
    setFrontlineTime,
    setRaidTime,
    setGuardianTime,
    toggleGuardian,
    toggleFrontline,
  } = useContentsTimeStore()

  const darkMode = useThemeStore((state) => state.darkMode)

  const [localRaid, setLocalRaid] = useState<number>(30) //
  const [localGuardian, setLocalGuardian] = useState<number>(3)
  const [localFrontline, setLocalFrontline] = useState<number>(3)

  // 각 UI 블록 필요한 데이터를 배열로 정의합니다.
  const contentData = [
    {
      id: 'raid',
      label: '레이드 클리어 시간 :',
      value: localRaid,
      onChange: setLocalRaid,
      onBlur: setRaidTime,
      hasCheckbox: false, // 휴게 체크박스 유무
    },
    {
      id: 'frontline',
      label: '전선 클리어 시간 :',
      value: localFrontline,
      onChange: setLocalFrontline,
      onBlur: setFrontlineTime,
      hasCheckbox: true,
      isChecked: isFrontline,
      onToggle: toggleFrontline,
    },
    {
      id: 'guardian',
      label: '가토 클리어 시간 :',
      value: localGuardian,
      onChange: setLocalGuardian,
      onBlur: setGuardianTime,
      hasCheckbox: true,
      isChecked: isGuardian,
      onToggle: toggleGuardian,
    },
  ]

  const commonDivClass = `${darkMode ? 'border-black/20' : 'border-gray'} flex items-center justify-between rounded-lg border-3 px-3 py-2`

  return (
    <div className='flex items-start justify-start gap-3 max-md:flex-col'>
      {/* 데이터 배열을 map으로 순회하여 UI를 렌더링 */}
      {contentData.map((content) => (
        <div key={content.id} className={commonDivClass}>
          <h4 className='text-black'>{content.label}</h4>
          <EfficiencyInput
            value={content.value}
            onChange={content.onChange}
            onBlur={content.onBlur}
          />
          {/* 휴게 체크박스를 조건부 렌더링 */}
          {content.hasCheckbox && (
            <div className='flex items-center gap-2'>
              <h4 className='text-black'>휴게: </h4>
              <Checkbox
                checked={content.isChecked}
                onChange={content.onToggle}
                width='24px'
                height='24px'
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
