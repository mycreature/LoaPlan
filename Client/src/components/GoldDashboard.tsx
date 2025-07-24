import useThemeStore from '../stores/others/ThemeStore'
import { calculateAverageLevel } from '../utils/expeditionDataUtils'
import { useExpeditionStore } from '../stores/api/ExpeditionStore'
import { expeditionGoldData } from '../types/Types'

interface GoldDashboardProps {
  GoldData: expeditionGoldData[]
  width?: number
  height?: number
}

const GoldDashboard = ({ width = 312, height = 200, GoldData }: GoldDashboardProps) => {
  const darkMode = useThemeStore((state) => state.darkMode)

  const expeditions = useExpeditionStore((state) => state.expeditions)

  const averageLevel = calculateAverageLevel(expeditions)

  const raidTotalGold = GoldData.reduce((acc, cur) => acc + cur.raidGold, 0)
  const etcTotalGold = GoldData.reduce((acc, cur) => acc + cur.otherGold, 0)
  const totalGold = raidTotalGold + etcTotalGold

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className={`flex flex-col justify-between gap-3 rounded-xl border p-3 ${darkMode ? 'border-black/30' : 'border-gray'}`}
    >
      <div className={`flex items-center justify-between`}>
        <h3 className='text-black'>원정대 평균</h3>
        <h3 className='text-black'>{averageLevel} LV</h3>
      </div>
      <div className={`flex items-center justify-between`}>
        <h3 className='text-black'>주간 레이드</h3>
        <h3 className='text-black'>{raidTotalGold} G</h3>
      </div>
      <div className={`flex items-center justify-between`}>
        <h3 className='text-black'>기타 컨텐츠</h3>
        <h3 className='text-black'>{etcTotalGold} G</h3>
      </div>
      <div className={`mb-0 flex items-center justify-between`}>
        <h3 className='text-black'>주간 골드량</h3>
        <h3 className='text-black'>{totalGold} G</h3>
      </div>
    </div>
  )
}

export default GoldDashboard
