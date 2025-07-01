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

export interface GateSelection {
  raidName: string
  type: '노말' | '하드' | '싱글'
  gates: number[]
}

export interface CharacterRaidSelection {
  characterName: string
  selections: GateSelection[]
}

export interface MaterialDrop {
  name: string
  amount: number
}

export interface OtherSelection {
  name: string
  type: '전선' | '카게' | '가토'
  level: number
  drops: MaterialDrop[]
}

export interface CharacterOtherSelection {
  characterName: string
  selections: OtherSelection[]
}
