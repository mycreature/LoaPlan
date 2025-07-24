import PieChartComponent from '../charts/PieChart'
import { expeditionColors } from '../../styles/colors'
import { useExpeditionGoldData } from '../../hook/useExpeditionGoldData'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import LevelRangeList from '../barracks/LevelRangeList'
import { getGoldByLevelRange } from '../../utils/expeditionDataUtils'
import GoldDashboard from '../GoldDashboard'

const SummaryPreview = ({ viewport = '' }) => {
  const expeditionGoldData = useExpeditionGoldData()
  const levelRangeExpeditionGoldData = getGoldByLevelRange(expeditionGoldData) || []
  const navigate = useNavigate()

  if (expeditionGoldData.length === 0 || levelRangeExpeditionGoldData.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 opacity-80'>
        <h3 className='text-black'>주간 골드 설정을 해주세요</h3>
        <Button text='설정하기' onClick={() => navigate('/Weekly-gold')} />
      </div>
    )
  }

  return (
    <div className='flex gap-11'>
      {viewport !== 'tablet' && (
        <PieChartComponent
          data={levelRangeExpeditionGoldData}
          colors={expeditionColors}
          width={193}
          height={196}
          outerRadius={96.5}
        />
      )}
      <LevelRangeList levelRange={levelRangeExpeditionGoldData} />
      <GoldDashboard GoldData={expeditionGoldData} width={307} height={196} />
    </div>
  )
}

export default SummaryPreview
