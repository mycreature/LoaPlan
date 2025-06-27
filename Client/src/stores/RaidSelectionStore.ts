import { create } from 'zustand'

interface GateSelection {
  raidName: string
  type: '노말' | '하드' | '싱글'
  gates: number[]
}

interface RaidSelectionState {
  selections: GateSelection[]
  toggleGate: (raidName: string, type: '노말' | '하드' | '싱글', gate: number) => void
  clearSelections: () => void
}

export const useRaidSelectionStore = create<RaidSelectionState>()((set, get) => ({
  selections: [],

  toggleGate: (raidName, type, gate) => {
    const { selections } = get()

    const existingRaid = selections.find((s) => s.raidName === raidName && s.type === type)

    if (existingRaid) {
      const gates = existingRaid.gates.includes(gate)
        ? existingRaid.gates.filter((g) => g !== gate) // 선택 해제
        : [...existingRaid.gates, gate] // 선택 추가

      const newSelections =
        gates.length > 0
          ? selections.map((s) =>
              s.raidName === raidName && s.type === type ? { ...s, gates } : s,
            )
          : selections.filter((s) => !(s.raidName === raidName && s.type === type)) // 관문 다 없으면 해당 레이드 삭제

      set({ selections: newSelections })
    } else {
      set({
        selections: [...selections, { raidName, type: type, gates: [gate] }],
      })
    }
  },

  clearSelections: () => set({ selections: [] }),
}))
