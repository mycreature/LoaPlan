import { create } from 'zustand'

interface accountStoreState {
  email: string
  apiKey: string
  character: string
}

const useAccountStore = create<accountStoreState>()(() => ({
  email: '',
  apiKey: '',
  character: '',
}))

export default useAccountStore
