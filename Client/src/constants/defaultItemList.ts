interface ItemInfo {
  name: string
  code: number
}

export const defaultItemList: ItemInfo[] = [
  // 무기 재료
  { name: '운명의 파괴석', code: 50010 },
  { name: '정제된 파괴강석', code: 50010 },

  // 방어구 재료
  { name: '운명의 수호석', code: 50010 },
  { name: '정제된 수호강석', code: 50010 },

  // 공통 재료
  { name: '운명의 돌파석', code: 50010 },
  { name: '찬란한 명예의 돌파석', code: 50010 },

  // 보석은 Market이 아닌 Auction
  { name: '1레벨 겁화의 보석', code: 210000 },
]
