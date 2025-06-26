export interface RaidGate {
  gate: number
  gold: number
}

export interface RaidType {
  type: '노말' | '하드' | '싱글'
  level: number
  gates: RaidGate[]
}

export interface RaidGold {
  name: string
  type: RaidType[]
}

export const raidGoldTable: RaidGold[] = [
  {
    name: '카멘',
    type: [
      {
        type: '노말',
        level: 1610,
        gates: [
          { gate: 1, gold: 1600 },
          { gate: 2, gold: 2000 },
          { gate: 3, gold: 2800 },
        ],
      },
      {
        type: '하드',
        level: 1620,
        gates: [
          { gate: 1, gold: 2000 },
          { gate: 2, gold: 2400 },
          { gate: 3, gold: 3600 },
          { gate: 4, gold: 5000 },
        ],
      },
    ],
  },

  {
    name: '에키드나',
    type: [
      {
        type: '노말',
        level: 1620,
        gates: [
          { gate: 1, gold: 2300 },
          { gate: 2, gold: 5000 },
        ],
      },
      {
        type: '하드',
        level: 1640,
        gates: [
          { gate: 1, gold: 2800 },
          { gate: 2, gold: 6000 },
        ],
      },
    ],
  },
  {
    name: '베히모스',
    type: [
      {
        type: '노말',
        level: 1640,
        gates: [
          { gate: 1, gold: 2800 },
          { gate: 2, gold: 6000 },
        ],
      },
    ],
  },
  {
    name: '에기르',
    type: [
      {
        type: '노말',
        level: 1660,
        gates: [
          { gate: 1, gold: 4750 },
          { gate: 2, gold: 10750 },
        ],
      },
      {
        type: '하드',
        level: 1680,
        gates: [
          { gate: 1, gold: 8000 },
          { gate: 2, gold: 16500 },
        ],
      },
    ],
  },
  {
    name: '아브2막',
    type: [
      {
        type: '노말',
        level: 1670,
        gates: [
          { gate: 1, gold: 7250 },
          { gate: 2, gold: 14250 },
        ],
      },
      {
        type: '하드',
        level: 1690,
        gates: [
          { gate: 1, gold: 10000 },
          { gate: 2, gold: 20500 },
        ],
      },
    ],
  },
  {
    name: '모르둠',
    type: [
      {
        type: '노말',
        level: 1680,
        gates: [
          { gate: 1, gold: 6000 },
          { gate: 2, gold: 9500 },
          { gate: 3, gold: 12500 },
        ],
      },
      {
        type: '하드',
        level: 1700,
        gates: [
          { gate: 1, gold: 7000 },
          { gate: 2, gold: 1100 },
          { gate: 3, gold: 20000 },
        ],
      },
    ],
  },
]
