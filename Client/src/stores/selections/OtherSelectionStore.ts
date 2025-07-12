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
    isDouble: boolean,
    multiplier: number,
  ) => void
  clearSelectionsForCharacter: (characterName: string) => void
  clearAllSelections: () => void
}

export const useOtherSelectionStore = create<OtherSelectionState>()(
  persist(
    (set, get) => ({
      characterSelections: [],

      toggleDrops: (
        characterName,
        name,
        type,
        level,
        dropsToToggle,
        isDouble = false,
        multiplier = 1,
      ) => {
        const { characterSelections } = get()

        const character = characterSelections.find((c) => c.characterName === characterName)

        const calcFinalAmount = (amount: number) => amount * multiplier * (isDouble ? 2 : 1)

        if (character) {
          const existingSelection = character.selections.find(
            (s) => s.name === name && s.type === type && s.level === level,
          )

          let updatedSelections: OtherInfo[]

          if (existingSelection) {
            const currentDrops = existingSelection.drops

            // 드롭 토글 처리
            const dropsAfterToggle = currentDrops.filter(
              (d) => !dropsToToggle.some((t) => t.name === d.name),
            )

            const dropsToAdd = dropsToToggle
              .filter((d) => !currentDrops.some((c) => c.name === d.name))
              .map((drop) => ({
                ...drop,
                amount: calcFinalAmount(drop.amount),
              }))

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
            // 새로운 선택 추가
            updatedSelections = [
              ...character.selections,
              {
                name,
                type,
                level,
                drops: dropsToToggle.map((drop) => ({
                  ...drop,
                  amount: calcFinalAmount(drop.amount),
                })),
              },
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
              {
                characterName,
                selections: [
                  {
                    name,
                    type,
                    level,
                    drops: dropsToToggle.map((drop) => ({
                      ...drop,
                      amount: calcFinalAmount(drop.amount),
                    })),
                  },
                ],
              },
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
