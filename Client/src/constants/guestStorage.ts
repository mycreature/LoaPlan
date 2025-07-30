export const guestAccount = {
  email: 'guest@guest.com',
  character: '이크리처',
  apiKey: import.meta.env.VITE_GUEST_API_KEY,
}

export const guestRaidSelection = {
  state: {
    characterSelections: [
      {
        characterName: '이크리처',
        selections: [
          { raidName: '모르둠', type: '하드', gates: [1] },
          { raidName: '모르둠', type: '노말', gates: [2, 3] },
          { raidName: '아브2막', type: '하드', gates: [1, 2] },
          { raidName: '에기르', type: '하드', gates: [1, 2] },
        ],
      },
      {
        characterName: '스크리처',
        selections: [
          { raidName: '모르둠', type: '노말', gates: [1, 2, 3] },
          { raidName: '아브2막', type: '노말', gates: [1, 2] },
          { raidName: '에기르', type: '하드', gates: [1] },
          { raidName: '에기르', type: '노말', gates: [2] },
        ],
      },
      {
        characterName: '리스리처',
        selections: [
          { raidName: '모르둠', type: '노말', gates: [1, 2, 3] },
          { raidName: '아브2막', type: '노말', gates: [1, 2] },
          { raidName: '에기르', type: '하드', gates: [1, 2] },
        ],
      },
      {
        characterName: '사스리처',
        selections: [
          { raidName: '에기르', type: '노말', gates: [1, 2] },
          { raidName: '에키드나', type: '하드', gates: [1, 2] },
        ],
      },
      {
        characterName: '레이리처',
        selections: [],
      },
      {
        characterName: '마이리처',
        selections: [
          { raidName: '에기르', type: '노말', gates: [1, 2] },
          { raidName: '베히모스', type: '노말', gates: [1, 2] },
          { raidName: '에키드나', type: '하드', gates: [1, 2] },
        ],
      },
    ],
  },
  version: 0,
}

export const guestOtherSelection = {
  state: {
    characterSelections: [
      {
        characterName: '이크리처',
        selections: [
          {
            name: '네프타1',
            type: '전선',
            level: 1700,
            drops: [
              { name: '운명의 파괴석', amount: 1668 },
              { name: '운명의 수호석', amount: 5070 },
              { name: '1레벨 겁화의 보석', amount: 30 },
            ],
          },
          {
            name: '드렉탈라스',
            type: '가토',
            level: 1700,
            drops: [
              { name: '운명의 파괴석', amount: 1122 },
              { name: '운명의 수호석', amount: 3300 },
              { name: '운명의 돌파석', amount: 120 },
            ],
          },
        ],
      },
      {
        characterName: '스크리처',
        selections: [
          {
            name: '쿠르잔3',
            type: '전선',
            level: 1680,
            drops: [
              { name: '운명의 파괴석', amount: 1338 },
              { name: '운명의 수호석', amount: 3852 },
              { name: '1레벨 겁화의 보석', amount: 30 },
            ],
          },
          {
            name: '스콜라키아',
            type: '가토',
            level: 1680,
            drops: [
              { name: '운명의 파괴석', amount: 1152 },
              { name: '운명의 수호석', amount: 2580 },
              { name: '운명의 돌파석', amount: 108 },
            ],
          },
        ],
      },
      {
        characterName: '리스리처',
        selections: [
          {
            name: '쿠르잔3',
            type: '전선',
            level: 1680,
            drops: [
              { name: '운명의 파괴석', amount: 1338 },
              { name: '운명의 수호석', amount: 3852 },
              { name: '1레벨 겁화의 보석', amount: 30 },
            ],
          },
          {
            name: '스콜라키아',
            type: '가토',
            level: 1680,
            drops: [
              { name: '운명의 파괴석', amount: 1152 },
              { name: '운명의 수호석', amount: 2580 },
              { name: '운명의 돌파석', amount: 108 },
            ],
          },
        ],
      },
      {
        characterName: '사스리처',
        selections: [
          {
            name: '쿠르잔2',
            type: '전선',
            level: 1660,
            drops: [
              { name: '운명의 파괴석', amount: 1110 },
              { name: '운명의 수호석', amount: 3114 },
              { name: '1레벨 겁화의 보석', amount: 24 },
            ],
          },
        ],
      },
      {
        characterName: '레이리처',
        selections: [
          {
            name: '쿠르잔2',
            type: '전선',
            level: 1660,
            drops: [
              { name: '운명의 파괴석', amount: 1110 },
              { name: '운명의 수호석', amount: 3114 },
              { name: '1레벨 겁화의 보석', amount: 24 },
            ],
          },
          {
            name: '아게오로스',
            type: '가토',
            level: 1640,
            drops: [
              { name: '운명의 파괴석', amount: 552 },
              { name: '운명의 수호석', amount: 1728 },
              { name: '운명의 돌파석', amount: 72 },
            ],
          },
        ],
      },
      {
        characterName: '마이리처',
        selections: [
          {
            name: '쿠르잔2',
            type: '전선',
            level: 1660,
            drops: [
              { name: '운명의 파괴석', amount: 1110 },
              { name: '운명의 수호석', amount: 3114 },
              { name: '1레벨 겁화의 보석', amount: 24 },
            ],
          },
          {
            name: '아게오로스',
            type: '가토',
            level: 1640,
            drops: [
              { name: '운명의 파괴석', amount: 552 },
              { name: '운명의 수호석', amount: 1728 },
              { name: '운명의 돌파석', amount: 72 },
            ],
          },
        ],
      },
    ],
  },
  version: 0,
}
