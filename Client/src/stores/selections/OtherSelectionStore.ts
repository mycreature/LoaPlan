import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { OtherSelection, DropInfo, OtherInfo } from '../../types/Types'

interface OtherSelectionState {
  characterSelections: OtherSelection[]
  toggleDrops: (
    characterName: string,
    name: string,
    type: '전선' | '카게' | '가토',
    level: number,
    dropToToggle: DropInfo[],
  ) => void
  clearSelectionsForCharacter: (characterName: string) => void
  clearAllSelections: () => void
}

export const useOtherSelectionStore = create<OtherSelectionState>()(
  persist(
    (set, get) => ({
      characterSelections: [],

      toggleDrops: (characterName, name, type, level, dropsToToggle) => {
        const { characterSelections } = get()

        const character = characterSelections.find((c) => c.characterName === characterName)

        if (character) {
          const existingSelection = character.selections.find(
            (s) => s.name === name && s.type === type && s.level === level,
          )

          let updatedSelections: OtherInfo[]

          if (existingSelection) {
            // 기존 드롭들과 비교해서 toggle
            const currentDrops = existingSelection.drops

            // 이름 기준으로 toggle
            const dropsAfterToggle = currentDrops.filter(
              (d) => !dropsToToggle.some((t) => t.name === d.name),
            )

            const dropsToAdd = dropsToToggle.filter(
              (d) => !currentDrops.some((c) => c.name === d.name),
            )

            const finalDrops = [...dropsAfterToggle, ...dropsToAdd]

            updatedSelections =
              finalDrops.length > 0
                ? character.selections.map((s) =>
                    s.name === name && s.type === type && s.level === level
                      ? { ...s, drops: finalDrops }
                      : s,
                  )
                : character.selections.filter(
                    (s) => !(s.name === name && s.type === type && s.level === level),
                  )
          } else {
            // 기존 selection이 없으면 추가
            updatedSelections = [
              ...character.selections,
              { name, type, level, drops: dropsToToggle },
            ]
          }

          set({
            characterSelections: characterSelections.map((c) =>
              c.characterName === characterName ? { ...c, selections: updatedSelections } : c,
            ),
          })
        } else {
          // 캐릭터가 없으면 새로 추가
          set({
            characterSelections: [
              ...characterSelections,
              { characterName, selections: [{ name, type, level, drops: dropsToToggle }] },
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
      name: 'other-selection-storage',
    },
  ),
)
