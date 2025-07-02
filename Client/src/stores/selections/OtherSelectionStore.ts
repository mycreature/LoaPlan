import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { OtherSelection, DropInfo, OtherInfo } from '../../types/Types'

interface OtherSelectionState {
  characterSelections: OtherSelection[]
  toggleDrop: (
    characterName: string,
    name: string,
    type: '전선' | '카게' | '가토',
    level: number,
    dropToToggle: DropInfo,
  ) => void
  clearSelectionsForCharacter: (characterName: string) => void
  clearAllSelections: () => void
}

export const useOtherSelectionStore = create<OtherSelectionState>()(
  persist(
    (set, get) => ({
      characterSelections: [],

      toggleDrop: (characterName, name, type, level, dropToToggle) => {
        const { characterSelections } = get()

        const character = characterSelections.find((c) => c.characterName === characterName)

        if (character) {
          // 선택한 캐릭터에서 특정 selection 찾기
          const existingSelection = character.selections.find(
            (s) => s.name === name && s.type === type && s.level === level,
          )

          let updatedSelections: OtherInfo[]

          if (existingSelection) {
            // dropToToggle 이 drops 배열에 있는지 검사 (name 기준으로 비교)
            const dropExists = existingSelection.drops.some((d) => d.name === dropToToggle.name)

            // toggle: 있으면 제거, 없으면 추가
            const newDrops = dropExists
              ? existingSelection.drops.filter((d) => d.name !== dropToToggle.name)
              : [...existingSelection.drops, dropToToggle]

            updatedSelections =
              newDrops.length > 0
                ? character.selections.map((s) =>
                    s.name === name && s.type === type && s.level === level
                      ? { ...s, drops: newDrops }
                      : s,
                  )
                : character.selections.filter(
                    (s) => !(s.name === name && s.type === type && s.level === level),
                  )
          } else {
            // 기존 selection 없으면 새로 추가
            updatedSelections = [
              ...character.selections,
              { name, type, level, drops: [dropToToggle] },
            ]
          }

          set({
            characterSelections: characterSelections.map((c) =>
              c.characterName === characterName ? { ...c, selections: updatedSelections } : c,
            ),
          })
        } else {
          // 캐릭터 자체가 없으면 새로 추가
          set({
            characterSelections: [
              ...characterSelections,
              { characterName, selections: [{ name, type, level, drops: [dropToToggle] }] },
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
