import { useMarketStore } from './../stores/api/MarketStore'
import { useExpeditionStore } from '../stores/api/ExpeditionStore'
import { useOtherSelectionStore } from '../stores/selections/OtherSelectionStore'
import { useRaidSelectionStore } from '../stores/selections/RaidSelectionStore'
import { getOtherDropsForCharacter, getRaidGoldForCharacter } from '../utils/SelectionUtils'
import { calculateGoldByDrops } from '../utils/MarketDataUtils'

// 사용자가 선택한 selections 값을 expeditions(원정대) 에 맞춰 배열로 변환하는 훅
export const useExpeditionGoldData = () => {
  const RaidSelections = useRaidSelectionStore((state) => state.characterSelections)
  const OtherSelection = useOtherSelectionStore((state) => state.characterSelections)
  const expeditions = useExpeditionStore((state) => state.expeditions)
  const itemInfos = useMarketStore((state) => state.itemInfos)

  if (!expeditions) return []

  return expeditions.map((character: { name: string; level: string }) => ({
    name: character.name,
    level: character.level,
    gold:
      getRaidGoldForCharacter(character.name, RaidSelections) +
      calculateGoldByDrops(getOtherDropsForCharacter(character.name, OtherSelection), itemInfos),
  }))
}
