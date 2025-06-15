import { persist } from 'zustand/middleware'
import { create } from 'zustand'

interface characterStoreState {
  character: string
  setCharacter: (character: string) => void
}

const useAccountStore = create<characterStoreState>()(
  persist(
    (set) => ({
      character: '',
      setCharacter: (character) => set({ character }),
    }),
    {
      name: 'character-storage',
    },
  ),
)

export default useAccountStore
