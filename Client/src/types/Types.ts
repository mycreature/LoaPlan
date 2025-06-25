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
  ItemAvgLevel: string
}
