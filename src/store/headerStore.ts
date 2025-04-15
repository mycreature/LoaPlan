import { create } from 'zustand';

interface HeaderState {
  title: string; // 현재 헤더에 보여줄 텍스트
  setTitle: (title: string) => void; // 그 텍스트를 바꾸는 함수
}

export const useHeaderStore = create<HeaderState>((set) => ({
  title: '', // 초기값
  setTitle: (title) => set({ title }), // title을 바꾸는 로직
}));
