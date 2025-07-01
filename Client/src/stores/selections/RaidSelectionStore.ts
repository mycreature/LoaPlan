import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CharacterRaidSelection, GateSelection } from '../../types/Types'

interface RaidSelectionState {
  characterSelections: CharacterRaidSelection[]
  toggleGate: (
    characterName: string,
    raidName: string,
    type: '노말' | '하드' | '싱글',
    gate: number,
  ) => void
  clearSelectionsForCharacter: (characterName: string) => void
  clearAllSelections: () => void
}

export const useRaidSelectionStore = create<RaidSelectionState>()(
  persist(
    (set, get) => ({
      characterSelections: [],

      toggleGate: (characterName, raidName, type, gate) => {
        const { characterSelections } = get()

        const character = characterSelections.find((c) => c.characterName === characterName)

        if (character) {
          const existingRaid = character.selections.find(
            (s) => s.raidName === raidName && s.type === type,
          )

          let updatedSelections: GateSelection[]

          if (existingRaid) {
            const gates = existingRaid.gates.includes(gate)
              ? existingRaid.gates.filter((g) => g !== gate) // 선택 해제
              : [...existingRaid.gates, gate] // 선택 추가

            updatedSelections =
              gates.length > 0
                ? character.selections.map((s) =>
                    s.raidName === raidName && s.type === type ? { ...s, gates } : s,
                  )
                : character.selections.filter((s) => !(s.raidName === raidName && s.type === type))
          } else {
            updatedSelections = [...character.selections, { raidName, type, gates: [gate] }]
          }

          set({
            characterSelections: characterSelections.map((c) =>
              c.characterName === characterName ? { ...c, selections: updatedSelections } : c,
            ),
          })
        } else {
          set({
            characterSelections: [
              ...characterSelections,
              { characterName, selections: [{ raidName, type, gates: [gate] }] },
            ],
          })
        }
      },

      clearSelectionsForCharacter: (characterName) => {
        set({
          characterSelections: get().characterSelections.filter(
            (c) => c.characterName !== characterName,
          ),
        })
      },

      clearAllSelections: () => set({ characterSelections: [] }),
    }),
    {
      name: 'raid-selection-storage',
    },
  ),
)
