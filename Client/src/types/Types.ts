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
