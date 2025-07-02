// src/stores/selections/SelectedCharacterStore.ts
import { create } from 'zustand'

interface SelectedCharacterState {
  selectedCharacterName: string | null
  setSelectedCharacter: (name: string) => void
}

export const useCharacterSelectionStore = create<SelectedCharacterState>((set) => ({
  selectedCharacterName: null,
  setSelectedCharacter: (name) => set({ selectedCharacterName: name }),
}))
