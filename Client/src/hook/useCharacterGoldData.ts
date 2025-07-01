import { useCharacterStore } from '../stores/CharacterStore'
import { useRaidSelectionStore } from '../stores/selections/RaidSelectionStore'
import { getTotalGoldForCharacter } from '../utils/raidSelectionUtils'

// 사용자가 선택한 selections 값을 expeditions(원정대) 에 맞춰 배열로 변환하는 훅
export const useExpeditionGoldData = () => {
  const selections = useRaidSelectionStore((state) => state.characterSelections)
  const expeditions = useCharacterStore((state) => state.expeditions)

  if (!expeditions) return []

  return expeditions.map((character: { name: string; level: string }) => ({
    name: character.name,
    level: character.level,
    gold: getTotalGoldForCharacter(character.name, selections),
  }))
}
