import { create } from 'zustand'

interface accountStoreState {
  email: string
  apiKey: string
  character: string
  exp: number
  isGuest: boolean
}

const useAccountStore = create<accountStoreState>()(() => ({
  email: '',
  apiKey: '',
  character: '',
  exp: 0,
  isGuest: false,
}))

export default useAccountStore
