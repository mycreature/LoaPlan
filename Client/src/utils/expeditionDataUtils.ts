import { ExpeditionCharacter } from '../types/Types'
import { levelRanges } from '../constants/levelRanges'

// 평균 아이템 레벨 계산
export const calculateAverageLevel = (characters?: ExpeditionCharacter[]): number => {
  if (!characters || !Array.isArray(characters)) return 0

  const expedition = characters.slice(0, 6).filter((char) => typeof char.level === 'string')

  const levels = expedition.map((char) => parseFloat(char.level.replace(/,/g, '')))

  const sum = levels.reduce((acc, level) => acc + (isNaN(level) ? 0 : level), 0)

  const AverageLevel = parseFloat((sum / expedition.length).toFixed(2))

  return AverageLevel
}

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
