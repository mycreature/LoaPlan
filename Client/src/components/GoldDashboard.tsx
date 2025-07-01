import { useRaidSelectionStore } from '../stores/selections/RaidSelectionStore'
import useThemeStore from '../stores/others/ThemeStore'
import { calculateAverageLevel } from '../utils/expeditionDataUtils'
import { getTotalRaidGold } from '../utils/SelectionUtils'
import { useExpeditionStore } from '../stores/api/ExpeditionStore'

interface GoldDashboardProps {
  width?: number
  height?: number
}

const GoldDashboard = ({ width = 312, height = 200 }: GoldDashboardProps) => {
  const darkMode = useThemeStore((state) => state.darkMode)

  const expeditions = useExpeditionStore((state) => state.expeditions)
  const selections = useRaidSelectionStore((state) => state.characterSelections)

  const averageLevel = calculateAverageLevel(expeditions)
  const raidTotalGold = getTotalRaidGold(selections)
  const etcTotalGold = 0 // 향후 구현 예정 (레이드 이외의 컨텐츠의 골드 수급량 구현 필요)
  const totalGold = raidTotalGold + etcTotalGold

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className={`flex flex-col justify-between rounded-xl border px-3 py-3 ${darkMode ? 'border-black/30' : 'border-gray'}`}
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
