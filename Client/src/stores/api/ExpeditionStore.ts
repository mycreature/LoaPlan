import { create } from 'zustand'
import { getExpeditionData } from '../../api/loaApi'
import { getApiKey } from '../../api/userApi'

interface CharacterState {
  [key: string]: any
}

export const useExpeditionStore = create<CharacterState>((set) => ({
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

  // 상태 초기화
  resetState: () => {
    set({})
  },
}))
