export interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
  apiKey: string
  character: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface UserProfile {
  email: string
  apiKey: string
  character: string
}
