import { useState } from 'react'
import { useContentsTimeStore } from '../../stores/selections/ContentsTimeSelectionStore'
import { EfficiencyInput } from './efficiencyInput'
import Checkbox from '../ui/CheckBox'

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

  // 로컬 시간 변경 함수 (레이드, 전선, 가토, 휴게 여부)
  const [localRaid, setLocalTime] = useState<number>(30)
  const [localGuardian, setLocalGuardian] = useState<number>(3)
  const [localFrontline, setLocalFrontline] = useState<number>(3)

  return (
    <div className='flex items-center justify-start gap-3'>
      <div className='border-gray flex items-center justify-between rounded-lg border-3 px-3 py-2'>
        <h4 className='text-black'>레이드 클리어 시간 : </h4>
        <EfficiencyInput value={localRaid} onChange={setLocalTime} onBlur={setRaidTime} />
      </div>
      <div className='border-gray flex items-center justify-between rounded-lg border-3 px-3 py-2'>
        <h4 className='text-black'>전선 클리어 시간 : </h4>
        <EfficiencyInput
          value={localFrontline}
          onChange={setLocalFrontline}
          onBlur={setFrontlineTime}
        />
        <div className='flex items-center gap-2'>
          <h4 className='text-black'>휴게: </h4>
          <Checkbox checked={isFrontline} onChange={toggleFrontline} width='24px' height='24px' />
        </div>
      </div>
      <div className='border-gray flex items-center justify-between rounded-lg border-3 px-3 py-2'>
        <h4 className='text-black'>가토 클리어 시간 : </h4>
        <EfficiencyInput
          value={localGuardian}
          onChange={setLocalGuardian}
          onBlur={setGuardianTime}
        />
        <div className='flex items-center gap-2'>
          <h4 className='text-black'>휴게: </h4>
          <Checkbox checked={isGuardian} onChange={toggleGuardian} width='24px' height='24px' />
        </div>
      </div>
    </div>
  )
}
