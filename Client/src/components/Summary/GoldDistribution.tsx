import PieChartComponent from '../charts/PieChart'
import { expeditionColors } from '../../styles/colors'
import { useExpeditionGoldData } from '../../hook/useExpeditionGoldData'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import { getGoldByLevelRange } from '../../utils/expeditionDataUtils'
import LevelRangeList from '../barracks/LevelRangeList'

const GoldDistribution = () => {
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
    <div className={`flex items-center justify-between`}>
      <div className='h-[166px] w-[164px]'>
        <PieChartComponent
          data={levelRangeExpeditionGoldData}
          colors={expeditionColors}
          height={168}
          outerRadius={84}
        />
      </div>
      <LevelRangeList levelRange={levelRangeExpeditionGoldData} />
    </div>
  )
}

export default GoldDistribution
