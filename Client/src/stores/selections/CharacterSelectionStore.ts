// src/stores/selections/SelectedCharacterStore.ts
import { create } from 'zustand'
import { getApiKey } from '../../api/userApi'
import { getCharProfile } from '../../api/loaApi'

interface SelectedCharacterState {
  selectedCharacterName: string | null
  setSelectedCharacter: (name: string) => void
  [key: string]: any
}

export const useCharacterSelectionStore = create<SelectedCharacterState>((set) => ({
  SelectedCharacterInfo: null,
  profileLoading: false,
  profileError: null,

  selectedCharacterName: null,
  setSelectedCharacter: (name) => set({ selectedCharacterName: name }),

  loadSelectedProfileData: async (characterName: string) => {
    try {
      set({ profileLoading: true, profileError: null })

      const apiKey = getApiKey()
      const res = await getCharProfile(apiKey, characterName) // 여기서 에러나면 catch로 감

      set({
        SelectedCharacterInfo: {
          name: res.CharacterName,
          server: res.ServerName,
          class: res.CharacterClassName,
          level: res.ItemAvgLevel,
          CharacterLevel: res.CharacterLevel,
          image: res.CharacterImage,
          combatPower: res.CombatPower,
          ExpeditionLevel: res.ExpeditionLevel,
        },
      })
    } catch (error) {
      set({
        profileError: error instanceof Error ? error.message : '프로필 데이터 로딩 실패',
        SelectedCharacterInfo: null,
      })
    } finally {
      set({ profileLoading: false })
    }
  },
}))
