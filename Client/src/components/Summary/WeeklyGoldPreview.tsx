import { useExpeditionGoldData } from '../../hook/useExpeditionGoldData'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'

import { getGoldByLevelRange } from '../../utils/expeditionDataUtils'
import GoldDashboard from '../GoldDashboard'
import BarChartComponent from '../charts/BarChart'

const SummaryPreview = ({ viewport = '' }) => {
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

  return (
    <div
      className={`flex justify-between ${viewport === 'mobile' ? 'flex-col gap-9' : ''} items-center`}
    >
      <div className='h-[196px] w-[312px]'>
        <BarChartComponent data={expeditionGoldData} legend={false} />
      </div>

      <div className='w-[255px]'>
        <GoldDashboard GoldData={expeditionGoldData} height={196} />
      </div>
    </div>
  )
}

export default SummaryPreview
