export interface AuthFormData {
  email: string
  verificationCode: string
  password: string
  confirmPassword: string
  apiKey: string
  character: string
}

export interface ExpeditionCharacter {
  ServerName: string
  CharacterName: string
  CharacterLevel: number
  CharacterClassName: string
  level: string
}

export interface RaidInfo {
  raidName: string
  type: '노말' | '하드' | '싱글'
  gates: number[]
}

export interface OtherInfo {
  name: string
  label?: string
  type: '전선' | '카게' | '가토'
  level: number
  drops: DropInfo[]
  isDouble: boolean
  multiplier: number
}

export interface DropInfo {
  name: string
  amount: number
}

export interface RaidSelection {
  characterName: string
  selections: RaidInfo[]
}

export interface OtherSelection {
  characterName: string
  selections: OtherInfo[]
}

export interface expeditionGoldData {
  name: string
  level: string
  raidGold: number
  otherGold: number
}

export interface contentsTimeSelection {
  raid: number
  frontline: number
  guardian: number
}
