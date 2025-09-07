import { create } from 'zustand'
import { contentsTimeSelection } from '../../types/Types'

interface ContentsTimeStore {
  contentsTime: contentsTimeSelection
  isGuardian: boolean
  isFrontline: boolean
  setRaidTime: (time: number) => void
  setGuardianTime: (time: number) => void
  setFrontlineTime: (time: number) => void
  setContentsTime: (times: contentsTimeSelection) => void
  toggleGuardian: () => void
  toggleFrontline: () => void
}

export const useContentsTimeStore = create<ContentsTimeStore>((set) => ({
  contentsTime: {
    raid: 10, // 게이트당 10분
    guardian: 5, // 기본값 전체 5분
    frontline: 3, // 기본값 전체 3분
  },
  isFrontline: false, // 전선 2배 여부
  isGuardian: false, // 가디언 토벌 2배 여부

  setRaidTime: (time) =>
    set((state) => ({
      contentsTime: { ...state.contentsTime, raid: time },
    })),
  setGuardianTime: (time) =>
    set((state) => ({
      contentsTime: { ...state.contentsTime, guardian: time },
    })),
  setFrontlineTime: (time) =>
    set((state) => ({
      contentsTime: { ...state.contentsTime, frontline: time },
    })),
  setContentsTime: (times) => set({ contentsTime: times }),

  toggleGuardian: () => set((state) => ({ isGuardian: !state.isGuardian })),
  toggleFrontline: () => set((state) => ({ isFrontline: !state.isFrontline })),
}))
