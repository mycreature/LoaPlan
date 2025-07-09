import { create } from 'zustand'
import { getItemData } from '../../api/loaApi'
import { getApiKey } from '../../api/userApi'

interface MarketState {
  [key: string]: any
}

export const useMarketStore = create<MarketState>((set) => ({
  loadItemInfo: async (CategoryCode: number, itemName?: string, pageNo?: number) => {
    try {
      set({ MarketLoading: true, MarketError: null })

      const apiKey = getApiKey()

      const res = await getItemData(apiKey, CategoryCode, itemName, pageNo)
      if (res) {
        set({
          itemInfo: {
            name: res.Name,
            image: res.Icon,
            BundleCount: res.BundleCount,
            YDayAvgPrice: res.YDayAvgPrice,
            RecentPrice: res.RecentPrice,
            CurrentMinPrice: res.CurrentMinPrice,
          },
        })
      }
    } catch (error) {
      set({ MarketError: error instanceof Error ? error.message : '아이템 정보 불러오기 실패' })
    } finally {
      set({ MarketLoading: false })
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
