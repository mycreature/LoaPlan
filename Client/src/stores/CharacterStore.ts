import { create } from 'zustand'
import { getCharProfile, getCharInfoData, getExpeditionData } from '../api/loaApi'
import { getApiKey } from '../api/userApi'

interface CharacterState {
  [key: string]: any
}

export const useCharacterStore = create<CharacterState>((set) => ({
  loadProfileData: async (characterName: string) => {
    try {
      set({ profileLoading: true, profileError: null })

      const apiKey = getApiKey()

      const res = await getCharProfile(apiKey, characterName)
      if (res) {
        set({
          MainCharacter: {
            name: res.CharacterName,
            server: res.ServerName,
            class: res.CharacterClassName,
            level: res.CharacterLevel,
            image: res.CharacterImage,
            expeditionLevel: res.ExpeditionLevel,
          },
        })
      }
    } catch (error) {
      set({ profileError: error instanceof Error ? error.message : '프로필 데이터 로딩 실패' })
    } finally {
      set({ profileLoading: false })
    }
  },

  // 캐릭터 정보 데이터 가져오기
  loadCharInfoData: async (characterName: string, filter?: string) => {
    try {
      set({ charInfoLoading: true, charInfoError: null })

      const apiKey = getApiKey()

      const res = await getCharInfoData(apiKey, characterName, filter)
      if (res) {
        set({ charInfoData: res })
      }
    } catch (error) {
      set({ charInfoError: error instanceof Error ? error.message : '캐릭터 정보 로딩 실패' })
    } finally {
      set({ charInfoLoading: false })
    }
  },

  // 원정대 데이터 가져오기
  loadExpeditionData: async (characterName: string) => {
    try {
      set({ expeditionLoading: true, expeditionError: null })

      const apiKey = getApiKey()

      const res = await getExpeditionData(apiKey, characterName)
      if (res) {
        if (Array.isArray(res)) {
          // 배열이면 아이템 레벨 기준 정렬
          if (res.length > 0) {
            const sortedExpedition = [...res].sort((a, b) => {
              const levelA = parseFloat(a.ItemAvgLevel.replace(/,/g, '')) || 0
              const levelB = parseFloat(b.ItemAvgLevel.replace(/,/g, '')) || 0
              return levelB - levelA
            })

            set({
              expeditions: sortedExpedition.map((expedition) => ({
                name: expedition.CharacterName,
                server: expedition.ServerName,
                level: expedition.ItemAvgLevel,
                class: expedition.CharacterClassName,
              })),
            })
          }
        }
        // 단일 객체인 경우 (기존 코드)
        else {
          set({
            name: res.CharacterName,
            server: res.ServerName,
            level: res.ItemAvgLevel,
            class: res.CharacterClassName,
          })
        }
      }
    } catch (error) {
      set({ expeditionError: error instanceof Error ? error.message : '원정대 데이터 로딩 실패' })
    } finally {
      set({ expeditionLoading: false })
    }
  },

  // 특정 프로필 요소 선택
  selectProfileElement: (element: any) => {
    set({ selectedProfileElement: element })
  },

  // 상태 초기화
  resetState: () => {
    set({})
  },
}))
