import PieChartComponent from '../charts/PieChart'
import { expeditionColors } from '../../styles/colors'
import { useExpeditionGoldData } from '../../hook/useExpeditionGoldData'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import { getGoldByLevelRange } from '../../utils/expeditionDataUtils'
import LevelRangeList from '../barracks/LevelRangeList'

interface viewportType {
  type?: 'tablet' | 'mobile' | null
}

const GoldDistribution = ({ type = null }: viewportType) => {
  const expeditionGoldData = useExpeditionGoldData()
  const levelRangeExpeditionGoldData = getGoldByLevelRange(expeditionGoldData) || []
  const navigate = useNavigate()

  if (expeditionGoldData.length === 0 || levelRangeExpeditionGoldData.length === 0) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center gap-4 opacity-80'>
        <h3 className='text-center text-black'>주간 골드 설정을 해주세요</h3>
        <Button text='설정하기' onClick={() => navigate('/Weekly-gold')} width={120} height={40} />
      </div>
    )
  }

  return type == 'tablet' ? (
    <div className='grid h-full w-full grid-cols-1 place-items-center justify-center gap-3'>
      <PieChartComponent
        data={levelRangeExpeditionGoldData}
        colors={expeditionColors}
        width={148}
      />
      <LevelRangeList levelRange={levelRangeExpeditionGoldData} />
    </div>
  ) : type == 'mobile' ? (
    <div className='h-full w-full'>
      <PieChartComponent
        data={levelRangeExpeditionGoldData}
        colors={expeditionColors}
        height={250}
      />
    </div>
  ) : (
    <div className='grid h-full w-full grid-cols-[1fr_148px] items-center gap-6'>
      <PieChartComponent data={levelRangeExpeditionGoldData} colors={expeditionColors} />
      <LevelRangeList levelRange={levelRangeExpeditionGoldData} />
    </div>
  )
}

export default GoldDistribution
