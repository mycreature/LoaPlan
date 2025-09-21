import { create } from 'zustand'

interface accountStoreState {
  email: string
  apiKey: string
  character: string
  exp: number
  isGuest: boolean
  loadLocalStorage: () => void
}

const useAccountStore = create<accountStoreState>()((set) => ({
  email: '',
  apiKey: '',
  character: '',
  exp: 0,
  isGuest: false,

  loadLocalStorage: () => {
    try {
      const data = localStorage.getItem('local-storage')
      if (!data) return

      const parsed = JSON.parse(data)

      set({
        apiKey: parsed.apiKey || '',
        character: parsed.character || '',
      })
    } catch (error) {
      console.error('Failed to load local storage:', error)
    }
  },
}))

export default useAccountStore
