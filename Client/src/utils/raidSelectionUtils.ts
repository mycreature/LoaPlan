import { raidGoldTable } from '../constants/goldRaidTable'
import { CharacterRaidSelection } from '../types/Types'

// 원정대내 특정 캐릭터의 주간 골드 획득량을 가져옴
// 사용자가 선택한 레이드 및 게이트(CharacterRaidSelection)를 raidGoldTable 에 맞춰 값을 가져옴
export const getRaidGoldForCharacter = (
  characterName: string,
  allSelections: CharacterRaidSelection[],
) => {
  const character = allSelections.find((c) => c.characterName === characterName)
  if (!character) return 0

  let total = 0

  character.selections.forEach(({ raidName, type, gates }) => {
    const raid = raidGoldTable.find((r) => r.name === raidName)
    if (!raid) return

    const typeData = raid.type.find((t) => t.type === type)
    if (!typeData) return

    gates.forEach((gateNum) => {
      const gate = typeData.gates.find((g) => g.gate === gateNum)
      if (gate) total += gate.gold
    })
  })

  return total
}

// 상위 기능과 유사하지만 원정대내 전체 레이드 골드 수급량 가져옴
export const getTotalRaidGold = (characterSelections: CharacterRaidSelection[]) => {
  let total = 0

  characterSelections.forEach((character) => {
    character.selections.forEach(({ raidName, type, gates }) => {
      const raid = raidGoldTable.find((r) => r.name === raidName)
      if (!raid) return

      const typeData = raid.type.find((t) => t.type === type)
      if (!typeData) return

      gates.forEach((gateNum) => {
        const gate = typeData.gates.find((g) => g.gate === gateNum)
        if (gate) total += gate.gold
      })
    })
  })

  return total
}
