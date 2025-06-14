import { persist } from 'zustand/middleware'
import { create } from 'zustand'

interface accountStoreState {
  email: string
  password: string
  confirmPassword: string
  apiKey: string
  character: string
  isLogin: boolean
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setConfirmPassword: (confirmPassword: string) => void
  setApiKey: (apiKey: string) => void
  setCharacter: (character: string) => void
}

const useAccountStore = create<accountStoreState>()(
  persist(
    (set) => ({
      email: '',
      password: '',
      confirmPassword: '',
      apiKey: '',
      character: '',
      isLogin: false,
      setEmail: (email) => set({ email, isLogin: email !== '' }),
      setPassword: (password) => set({ password }),
      setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
      setApiKey: (apiKey) => set({ apiKey }),
      setCharacter: (character) => set({ character }),
    }),
    {
      name: 'account-storage', // 로컬 스토리지 이름
      partialize: (state) => ({
        email: state.email,
        apiKey: state.apiKey,
        character: state.character,
        isLogin: state.isLogin,
      }), // 패스워드는 localStorage에 저장하지 않도록 설정
    },
  ),
)

export default useAccountStore
