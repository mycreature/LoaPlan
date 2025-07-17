import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  darkMode: boolean
  toggleDarkMode: () => void
}

const useThemeStore = create<StoreState>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'darkmode-storage', // 로컬 스토리지에 저장될 때 사용할 키 이름
      // 필요에 따라 추가 옵션 설정 가능
      // 예: storage: sessionStorage - 세션 스토리지 사용
    },
  ),
)

export default useThemeStore
