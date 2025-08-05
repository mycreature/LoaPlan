import { create } from 'zustand'
import { getItemData, getJewelData } from '../../api/loaApi'
import { getApiKey } from '../../api/userApi'
import { defaultItemList } from '../../constants/defaultItemList'

interface ItemInfo {
  name: string
  image: string
  BundleCount?: number
  YDayAvgPrice?: number
  RecentPrice?: number
  CurrentMinPrice?: number
  BuyPrice?: number
  StartPrice?: number
  BidPrice?: number
  EndDate?: string
}

interface MarketState {
  dropItemInfos: Record<string, ItemInfo>
  MarketLoading?: boolean
  MarketError?: string | null
  loadItemInfo: () => Promise<void>
  resetState: () => void
}

export const useMarketStore = create<MarketState>((set) => ({
  dropItemInfos: {},

  loadItemInfo: async () => {
    try {
      set({ MarketLoading: true, MarketError: null })

      const apiKey = getApiKey()

      for (const item of defaultItemList) {
        try {
          let res

          if (item.name === '1레벨 겁화의 보석') {
            res = await getJewelData(apiKey, item.name)

            if (res?.Items?.length > 0) {
              const jewelItem = res.Items[0]
              set((state) => ({
                dropItemInfos: {
                  ...state.dropItemInfos,
                  [jewelItem.Name]: {
                    name: jewelItem.Name,
                    image: jewelItem.Icon,
                    BuyPrice: jewelItem.AuctionInfo?.BuyPrice,
                    StartPrice: jewelItem.AuctionInfo?.StartPrice,
                    BidPrice: jewelItem.AuctionInfo?.BidPrice,
                    EndDate: jewelItem.AuctionInfo?.EndDate,
                  },
                },
              }))
            }
          } else {
            res = await getItemData(apiKey, item.name, item.CategoryCode)

            if (res?.Items?.length > 0) {
              const itemData = res.Items[0]
              set((state) => ({
                dropItemInfos: {
                  ...state.dropItemInfos,
                  [itemData.Name]: {
                    name: itemData.Name,
                    image: itemData.Icon,
                    BundleCount: itemData.BundleCount,
                    YDayAvgPrice: itemData.YDayAvgPrice,
                    RecentPrice: itemData.RecentPrice,
                    CurrentMinPrice: itemData.CurrentMinPrice,
                  },
                },
              }))
            }
          }
        } catch (innerError) {
          console.warn(`⚠️ ${item.name} 처리 중 오류 발생`, innerError)
          // 개별 아이템 오류는 무시하고 다음 아이템 진행
        }
      }
    } catch (error) {
      set({ MarketError: error instanceof Error ? error.message : '아이템 정보 불러오기 실패' })
    } finally {
      set({ MarketLoading: false })
      if (typeof window !== 'undefined') {
        ;(window as any).marketStore = useMarketStore
      }
    }
  },

  resetState: () => set({ dropItemInfos: {} }),
}))
