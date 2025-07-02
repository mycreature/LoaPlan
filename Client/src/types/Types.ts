export interface AuthFormData {
  email: string
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
  type: '전선' | '카게' | '가토'
  level: number
  drops: DropInfo[]
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
