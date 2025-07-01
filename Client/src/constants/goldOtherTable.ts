interface MaterialDrop {
  name: string
  amount: number
}

interface WeeklyContentMaterial {
  name: string
  type: '전선' | '카게' | '가토'
  level: number
  drops: MaterialDrop[]
}

export const goldOtherTable: WeeklyContentMaterial[] = [
  {
    name: '쿠르잔1',
    type: '전선',
    level: 1640,
    drops: [
      { name: '운명의 파괴석', amount: 147 },
      { name: '운명의 수호석', amount: 457 },
      { name: '1레벨 보석', amount: 2 },
    ],
  },
  {
    name: '쿠르잔2',
    type: '전선',
    level: 1660,
    drops: [
      { name: '운명의 파괴석', amount: 185 },
      { name: '운명의 수호석', amount: 519 },
      { name: '1레벨 보석', amount: 4 },
    ],
  },
  {
    name: '쿠르잔3',
    type: '전선',
    level: 1680,
    drops: [
      { name: '운명의 파괴석', amount: 223 },
      { name: '운명의 수호석', amount: 642 },
      { name: '1레벨 보석', amount: 5 },
    ],
  },
  {
    name: '네프타1',
    type: '전선',
    level: 1700,

    drops: [
      { name: '운명의 파괴석', amount: 278 },
      { name: '운명의 수호석', amount: 845 },
      { name: '운명의 돌파석', amount: 5 },
    ],
  },
  {
    name: '아게오로스',
    type: '가토',
    level: 1640,
    drops: [
      { name: '운명의 파괴석', amount: 92 },
      { name: '운명의 수호석', amount: 288 },
      { name: '운명의 돌파석', amount: 12 },
    ],
  },
  {
    name: '스콜라키아',
    type: '가토',
    level: 1680,
    drops: [
      { name: '운명의 파괴석', amount: 192 },
      { name: '운명의 수호석', amount: 430 },
      { name: '운명의 돌파석', amount: 18 },
    ],
  },
  {
    name: '드렉탈라스',
    type: '가토',
    level: 1700,
    drops: [
      { name: '운명의 파괴석', amount: 187 },
      { name: '운명의 수호석', amount: 550 },
      { name: '운명의 돌파석', amount: 20 },
    ],
  },
]
