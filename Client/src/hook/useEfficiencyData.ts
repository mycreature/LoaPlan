import { goldOtherTable } from '../constants/goldOtherTable'
import { raidGoldTable } from '../constants/goldRaidTable'
import { useMarketStore } from '../stores/api/MarketStore'
import { useContentsTimeStore } from '../stores/selections/ContentsTimeSelectionStore'
import { calculateGoldByDrops } from '../utils/MarketDataUtils'

export const useEfficiencyData = () => {
  // 드랍 컨텐츠 아이템의 기본 시세 정보
  const refineItemInfos = useMarketStore((state) => state.refineItemInfos)

  const { raid, frontline, guardian } = useContentsTimeStore((state) => state.contentsTime)
  const isFrontline = useContentsTimeStore((state) => state.isFrontline)
  const isGuardian = useContentsTimeStore((state) => state.isGuardian)

  // raid의 이름 및 레이드 종합 골드 변환
  const raidData = raidGoldTable.flatMap((table) =>
    table.type.map((t) => {
      return {
        name: t.label,
        type: t.type,
        Gold: (t.totalGold / raid) * 60, // 시간당 골드 (차트의 datakey 이기에 대문자)
      }
    }),
  )

  // 전선 테이블의 이름 및 골드 변환
  const FrontlineData = goldOtherTable
    .filter((table) => table.type === '전선')
    .map((table) => {
      const gold = calculateGoldByDrops(table.drops, refineItemInfos) // 드랍 테이블을 골드시세로 변환
      return {
        name: table.name,
        type: table.type,
        Gold: (gold / frontline) * 60 * (isFrontline ? 2 : 1), // 시간당 골드 (차트의 datakey 이기에 대문자)
      }
    })

  // 가토 테이블의 이름 및 골드 변환
  const GuardianData = goldOtherTable
    .filter((table) => table.type === '가토')
    .map((table) => {
      const gold = calculateGoldByDrops(table.drops, refineItemInfos) // 드랍 테이블을 골드시세로 변환
      return {
        name: table.label,
        type: table.type,
        Gold: (gold / guardian) * 60 * (isGuardian ? 2 : 1), // 시간당 골드 (차트의 datakey 이기에 대문자)
      }
    })

  return { raidData, FrontlineData, GuardianData }
}
