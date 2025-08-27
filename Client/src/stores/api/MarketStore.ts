import { create } from 'zustand'
import { getItemsByCategory, getJewelData } from '../../api/loaApi'
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
  refineItemInfos: Record<string, ItemInfo>
  MarketLoading?: boolean
  MarketError?: string | null
  loadRefineItemInfos: () => Promise<void>
  resetState: () => void
}

export const useMarketStore = create<MarketState>((set) => ({
  refineItemInfos: {},

  loadRefineItemInfos: async () => {
    try {
      set({ MarketLoading: true, MarketError: null })

      const apiKey = getApiKey()

      const categoryCodes = Array.from(new Set(defaultItemList.map((item) => item.CategoryCode)))

      const itemTier = [3, 4] // 3,4티어 재료 기준

      for (const code of categoryCodes) {
        try {
          let res: any

          // 보석 카테고리 코드
          if (code === 210000) {
            const itemName = defaultItemList.find((item) => item.CategoryCode === code)?.name ?? ''

            res = await getJewelData(apiKey, itemName)

            if (res?.Items?.length > 0) {
              const jewelItem = res.Items[4] // 호출되는 10개 중 중간값

              set((state) => ({
                refineItemInfos: {
                  ...state.refineItemInfos,
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
            for (const tier of itemTier) {
              const allItems: any[] = []

              // 1페이지 먼저 호출
              const firstPageRes = await getItemsByCategory(apiKey, code, tier, 1)
              if (firstPageRes?.Items?.length > 0) {
                allItems.push(...firstPageRes.Items)

                const totalPages = Math.ceil(firstPageRes.TotalCount / firstPageRes.PageSize)

                // 2페이지부터 끝까지 호출
                for (let page = 2; page <= totalPages; page++) {
                  try {
                    const pageRes = await getItemsByCategory(apiKey, code, tier, page)
                    if (pageRes?.Items?.length > 0) {
                      allItems.push(...pageRes.Items)
                    }
                  } catch (pageErr) {
                    console.warn(
                      `⚠️ 코드 ${code}, 티어 ${tier}, 페이지 ${page} 에서 오류 발생`,
                      pageErr,
                    )
                  }
                }

                // 아이템 상태에 반영
                set((state) => {
                  const updated: Record<string, ItemInfo> = { ...state.refineItemInfos }

                  allItems.forEach((item: any) => {
                    updated[item.Name] = {
                      name: item.Name,
                      image: item.Icon,
                      BundleCount: item.BundleCount,
                      YDayAvgPrice: item.YDayAvgPrice,
                      RecentPrice: item.RecentPrice,
                      CurrentMinPrice: item.CurrentMinPrice,
                    }
                  })

                  return { refineItemInfos: updated }
                })
              }
            }
          }
        } catch (innerError) {
          console.warn(`⚠️ 카테고리 코드: ${code} 처리 중 오류 발생`, innerError)
          // 개별 아이템 오류는 무시하고 다음 아이템 진행
        }
      }
    } catch (error) {
      set({ MarketError: error instanceof Error ? error.message : '아이템 정보 불러오기 실패' })
    } finally {
      set({ MarketLoading: false })
    }
  },

  resetState: () => set({ refineItemInfos: {} }),
}))
