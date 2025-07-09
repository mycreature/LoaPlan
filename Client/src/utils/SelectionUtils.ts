import { raidGoldTable } from '../constants/goldRaidTable'
import { goldOtherTable } from '../constants/goldOtherTable'
import { OtherSelection, RaidSelection } from '../types/Types'

// 원정대내 특정 캐릭터의 주간 골드 획득량을 가져옴
// 사용자가 선택한 레이드 및 게이트(CharacterRaidSelection)를 raidGoldTable 에 맞춰 값을 가져옴
export const getRaidGoldForCharacter = (characterName: string, allSelections: RaidSelection[]) => {
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
export const getTotalRaidGold = (characterSelections: RaidSelection[]) => {
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

export const getOtherDropsForCharacter = (
  characterName: string,
  allSelections: OtherSelection[],
) => {
  const character = allSelections.find((c) => c.characterName === characterName)
  if (!character) return []

  const allDrops: { name: string; amount: number }[] = []

  character.selections.forEach(({ name, type, level }) => {
    const tableEntry = goldOtherTable.find(
      (entry) => entry.name === name && entry.type === type && entry.level === level,
    )
    if (!tableEntry) return

    tableEntry.drops.forEach((drop) => {
      const existingDrop = allDrops.find((d) => d.name === drop.name)

      if (existingDrop) {
        // 기존 드롭의 수량 증가
        existingDrop.amount += drop.amount
      } else {
        // 새로운 드롭 추가
        allDrops.push({ name: drop.name, amount: drop.amount })
      }
    })
  })

  return allDrops
}
