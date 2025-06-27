import { raidGoldTable } from '../constants/goldRaidTable'

export const getTotalSelectedRaidGold = (
  selections: { raidName: string; type: '노말' | '하드' | '싱글'; gates: number[] }[],
) => {
  let total = 0

  selections.forEach(({ raidName, type, gates }) => {
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
