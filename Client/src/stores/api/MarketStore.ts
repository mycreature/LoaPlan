import { create } from 'zustand'
import { getItemData } from '../../api/loaApi'
import { getApiKey } from '../../api/userApi'

interface MarketState {
  [key: string]: any
}

export const useMarketStore = create<MarketState>((set) => ({
  itemInfos: {},

  loadItemInfo: async (itemName: string, CategoryCode?: number, pageNo?: number) => {
    try {
      set({ MarketLoading: true, MarketError: null })

      const apiKey = getApiKey()
      const res = await getItemData(apiKey, itemName, CategoryCode, pageNo)
      if (res) {
        set((state) => ({
          itemInfos: {
            ...state.itemInfos,
            [res.Name]: {
              name: res.Name,
              image: res.Icon,
              BundleCount: res.BundleCount,
              YDayAvgPrice: res.YDayAvgPrice,
              RecentPrice: res.RecentPrice,
              CurrentMinPrice: res.CurrentMinPrice,
            },
          },
        }))
      }
    } catch (error) {
      set({ MarketError: error instanceof Error ? error.message : '아이템 정보 불러오기 실패' })
    } finally {
      set({ MarketLoading: false })
    }
  },

  resetState: () => set({ itemInfos: {} }),
}))
