import { raidGoldTable, RaidGold, RaidType } from '../constants/goldRaidTable'

interface AvailableRaid {
  raidName: string
  type: '노말' | '하드' | '싱글'
}

// 레이드 레벨에 따른 활성화 가능한 레이드 목록을 반환하는 함수
export const getAvailableRaidsByLevel = (level: number): AvailableRaid[] => {
  const available: AvailableRaid[] = []

  raidGoldTable.forEach((raid: RaidGold) => {
    raid.type.forEach((raidType: RaidType) => {
      if (level >= raidType.level) {
        available.push({
          raidName: raid.name,
          type: raidType.type,
        })
      }
    })
  })

  return available
}
