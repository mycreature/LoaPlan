import { create } from 'zustand'

interface accountStoreState {
  email: string
  apiKey: string
  character: string
  exp: number
}

const useAccountStore = create<accountStoreState>()(() => ({
  email: '',
  apiKey: '',
  character: '',
  exp: 0,
}))

export default useAccountStore
