import { useExpeditionGoldData } from '../../hook/useExpeditionGoldData'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import { getGoldByLevelRange } from '../../utils/expeditionDataUtils'
import GoldDashboard from '../GoldDashboard'
import WeeklyGoldChart from '../charts/WeeklyGoldChart'

interface viewportType {
  type: 'tablet' | 'mobile' | 'desktop' | null
}

const WeeklyGoldPreview = ({ type = null }: viewportType) => {
  const expeditionGoldData = useExpeditionGoldData()
  const levelRangeExpeditionGoldData = getGoldByLevelRange(expeditionGoldData) || []
  const navigate = useNavigate()

  if (expeditionGoldData.length === 0 || levelRangeExpeditionGoldData.length === 0) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center gap-4 opacity-80'>
        <h3 className='text-black'>주간 골드 설정을 해주세요</h3>
        <Button text='설정하기' onClick={() => navigate('/Weekly-gold')} width={120} height={40} />
      </div>
    )
  }

  return type === 'desktop' ? (
    <div className='flex w-full gap-5'>
      <WeeklyGoldChart data={expeditionGoldData} legend={false} height={196} />
      <GoldDashboard GoldData={expeditionGoldData} height={196} />
    </div>
  ) : type === 'tablet' ? (
    <div className='md-lg:grid-cols-[1fr_255px] grid h-full w-full grid-cols-1 items-center gap-5'>
      <WeeklyGoldChart data={expeditionGoldData} legend={false} height={196} />
      <div className='md-lg:block hidden'>
        <GoldDashboard GoldData={expeditionGoldData} height={196} />
      </div>
    </div>
  ) : type === 'mobile' ? (
    <div className='sm-md:grid-cols-[1fr_255px] grid w-full grid-cols-1 items-center justify-center gap-6'>
      <WeeklyGoldChart data={expeditionGoldData} legend={false} height={196} />
      <GoldDashboard GoldData={expeditionGoldData} height={196} />
    </div>
  ) : null
}

export default WeeklyGoldPreview
