import { raidGoldTable } from '../constants/goldRaidTable'
import { CharacterRaidSelection } from '../types/Types'

export const getTotalGoldForCharacter = (
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
