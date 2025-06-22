import { persist } from 'zustand/middleware'
import { create } from 'zustand'

interface accountStoreState {
  apiKey: string
  character: string
  setApiKey: (apiKey: string) => void
  setCharacter: (character: string) => void
}

const useAccountStore = create<accountStoreState>()(
  persist(
    (set) => ({
      apiKey: '',
      character: '',
      setApiKey: (apiKey) => set({ apiKey }),
      setCharacter: (character) => set({ character }),
    }),
    {
      name: 'account-storage', // 로컬 스토리지 이름
    },
  ),
)

export default useAccountStore
