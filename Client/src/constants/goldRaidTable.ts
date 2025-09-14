export interface RaidGate {
  gate: number
  gold: number
}

export interface RaidType {
  type: '노말' | '하드' | '싱글'
  label: string
  level: number
  gates: RaidGate[]
  totalGold: number
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
        label: '노멘',
        level: 1610,
        gates: [
          { gate: 1, gold: 800 },
          { gate: 2, gold: 1000 },
          { gate: 3, gold: 1400 },
        ],
        totalGold: 3200,
      },
      {
        type: '하드',
        label: '하멘',
        level: 1620,
        gates: [
          { gate: 1, gold: 1000 },
          { gate: 2, gold: 1200 },
          { gate: 3, gold: 1800 },
          { gate: 4, gold: 2500 },
        ],
        totalGold: 6500,
      },
    ],
  },

  {
    name: '에키드나',
    type: [
      {
        type: '노말',
        label: '노키',
        level: 1620,
        gates: [
          { gate: 1, gold: 1150 },
          { gate: 2, gold: 2500 },
        ],
        totalGold: 3650,
      },
      {
        type: '하드',
        label: '하키',
        level: 1640,
        gates: [
          { gate: 1, gold: 2800 },
          { gate: 2, gold: 6000 },
        ],
        totalGold: 8800,
      },
    ],
  },
  {
    name: '베히모스',
    type: [
      {
        type: '노말',
        label: '베히',
        level: 1640,
        gates: [
          { gate: 1, gold: 2800 },
          { gate: 2, gold: 6000 },
        ],
        totalGold: 8800,
      },
    ],
  },
  {
    name: '에기르',
    type: [
      {
        type: '노말',
        label: '노기르',
        level: 1660,
        gates: [
          { gate: 1, gold: 4750 },
          { gate: 2, gold: 10750 },
        ],
        totalGold: 15500,
      },
      {
        type: '하드',
        label: '하기르',
        level: 1680,
        gates: [
          { gate: 1, gold: 8000 },
          { gate: 2, gold: 16500 },
        ],
        totalGold: 24500,
      },
    ],
  },
  {
    name: '아브2막',
    type: [
      {
        type: '노말',
        label: '노브2막',
        level: 1670,
        gates: [
          { gate: 1, gold: 7250 },
          { gate: 2, gold: 14250 },
        ],
        totalGold: 21500,
      },
      {
        type: '하드',
        label: '하브2막',
        level: 1690,
        gates: [
          { gate: 1, gold: 10000 },
          { gate: 2, gold: 20500 },
        ],
        totalGold: 30500,
      },
    ],
  },
  {
    name: '모르둠',
    type: [
      {
        type: '노말',
        label: '노르둠',
        level: 1680,
        gates: [
          { gate: 1, gold: 6000 },
          { gate: 2, gold: 9500 },
          { gate: 3, gold: 12500 },
        ],
        totalGold: 28000,
      },
      {
        type: '하드',
        label: '하르둠',
        level: 1700,
        gates: [
          { gate: 1, gold: 7000 },
          { gate: 2, gold: 11000 },
          { gate: 3, gold: 20000 },
        ],
        totalGold: 38000,
      },
    ],
  },
  {
    name: '아르모체',
    type: [
      {
        type: '노말',
        label: '노르모체',
        level: 1700,
        gates: [
          { gate: 1, gold: 12500 },
          { gate: 2, gold: 20500 },
        ],
        totalGold: 33000,
      },
      {
        type: '하드',
        label: '하르모체',
        level: 1720,
        gates: [
          { gate: 1, gold: 15000 },
          { gate: 2, gold: 27000 },
        ],
        totalGold: 42000,
      },
    ],
  },
  {
    name: '카제로스',
    type: [
      {
        type: '노말',
        label: '카제노말',
        level: 1710,
        gates: [
          { gate: 1, gold: 14000 },
          { gate: 2, gold: 26000 },
        ],
        totalGold: 40000,
      },
      {
        type: '하드',
        label: '카제하드',
        level: 1730,
        gates: [
          { gate: 1, gold: 17000 },
          { gate: 2, gold: 35000 },
        ],
        totalGold: 52000,
      },
    ],
  },
]
