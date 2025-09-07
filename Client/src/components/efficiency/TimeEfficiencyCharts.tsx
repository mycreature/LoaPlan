import { raidGoldTable } from '../../constants/goldRaidTable'
import { goldOtherTable } from '../../constants/goldOtherTable'
import { useMarketStore } from '../../stores/api/MarketStore'
import { calculateGoldByDrops } from '../../utils/MarketDataUtils'
import { BarChart } from 'recharts'

// 레이드, 전선, 가토 클리어 시간 (분 단위)
interface TimeEfficiencyChartsProps {
  raid: number
  Frontline: number
  Guardian: number
}

const TimeEfficiencyCharts = ({
  raid = 10,
  Frontline = 3,
  Guardian = 5,
}: TimeEfficiencyChartsProps) => {
  // 드랍 컨텐츠 아이템의 기본 시세 정보
  const refineItemInfos = useMarketStore((state) => state.refineItemInfos)

  // raid의 이름 및 레이드 종합 골드 변환
  const raidData = raidGoldTable.flatMap((table) =>
    table.type.map((t) => {
      const totalRaidTime = raid * t.gates.length // 각 레이드의 게이트 갯수 반영
      return {
        name: `${table.name} ${t.type}`,
        gold: (t.totalGold / totalRaidTime) * 60, // 시간당 골드
      }
    }),
  )

  // 전선 테이블의 이름 및 골드  변환
  const FrontlineData = goldOtherTable
    .filter((table) => table.type === '전선')
    .map((table) => {
      const gold = calculateGoldByDrops(table.drops, refineItemInfos) // 드랍 테이블을 골드시세로 변환
      return {
        name: table.name,
        gold: (gold / Frontline) * 60,
      }
    })

  const GuardianData = goldOtherTable
    .filter((table) => table.type === '가토')
    .map((table) => {
      const gold = calculateGoldByDrops(table.drops, refineItemInfos) // 드랍 테이블을 골드시세로 변환
      return {
        name: table.name,
        gold: (gold / Guardian) * 60,
      }
    })

  console.log('raidData', raidData)
  console.log('FrontlineData', FrontlineData)
  console.log('GuardianData', GuardianData)

  return <div className='flex w-full'></div>
}

export default TimeEfficiencyCharts
