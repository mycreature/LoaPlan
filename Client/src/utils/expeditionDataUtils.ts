import { ExpeditionCharacter, OtherInfo } from '../types/Types'
import { levelRanges } from '../constants/levelRanges'
import { RaidGold, raidGoldTable, RaidType } from '../constants/goldRaidTable'
import { goldOtherTable } from '../constants/goldOtherTable'

interface AvailableRaid {
  raidName: string
  type: '노말' | '하드' | '싱글'
}

// 원정대 상위 6명 캐릭터의 평균 레벨 계산
export const calculateAverageLevel = (characters?: ExpeditionCharacter[]): number => {
  if (!characters || !Array.isArray(characters)) return 0

  const expedition = characters.slice(0, 6).filter((char) => typeof char.level === 'string')

  const levels = expedition.map((char) => parseFloat(char.level.replace(/,/g, '')))

  const sum = levels.reduce((acc, level) => acc + (isNaN(level) ? 0 : level), 0)

  const AverageLevel = parseFloat((sum / expedition.length).toFixed(2))

  return AverageLevel
}

// 원정대 상위 6명 캐릭터의 레벨을 levelRanges에 따라 분류하여 카운트
export const countCharactersByLevelRange = (
  characters?: ExpeditionCharacter[],
): Record<number, number> => {
  const sortedRanges = [...levelRanges].sort((a, b) => a - b)
  const result: Record<number, number> = {}

  // 초기값 세팅
  for (const range of sortedRanges) {
    result[range] = 0
  }

  if (!Array.isArray(characters)) return result

  // 상위 6개만 처리 (필요 없으면 제거 가능)
  const expedition = characters.slice(0, 6)

  for (const char of expedition) {
    if (typeof char.level !== 'string') continue

    const level = parseFloat(char.level.replace(/,/g, ''))
    if (isNaN(level)) continue

    const targetRange = sortedRanges
      .slice()
      .reverse()
      .find((range) => level >= range)
    if (targetRange !== undefined) result[targetRange] += 1
  }

  return result
}

// 사용자가 Selection한 캐릭터의 gold을 levelRanges에 따라 분류
export const getGoldByLevelRange = (data: { name: string; level: string; gold: number }[]) => {
  const parseLevel = (levelStr: string): number => {
    return Number(levelStr.replace(/,/g, ''))
  }

  return levelRanges
    .map((range) => {
      const totalGold = data
        .filter((char) => {
          const level = parseLevel(char.level)
          return level >= range && level < range + 10
        })
        .reduce((sum, char) => sum + char.gold, 0)

      return {
        levelRange: range,
        totalGold,
      }
    })
    .filter((item) => item.totalGold > 0)
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

// 기타컨텐츠를 입력받은 레벨보다 낮거나 같은 값중 가장 높은 레벨 컨텐츠 반환 함수
export const getAvailableOthersByLevel = (targetLevel: number): OtherInfo[] => {
  const typeMap = goldOtherTable
    .filter((item) => item.level <= targetLevel)
    .reduce((acc, item) => {
      const existing = acc.get(item.type)
      if (!existing || existing.level < item.level) {
        acc.set(item.type, {
          name: item.name,
          type: item.type,
          level: item.level,
          drops: item.drops,
        })
      }
      return acc
    }, new Map<string, OtherInfo>())

  return Array.from(typeMap.values())
}
