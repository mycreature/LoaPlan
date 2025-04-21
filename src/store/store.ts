import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;      // 사용자 고유 식별자
  name: string;    // 사용자 이름
  email: string;   // 사용자 이메일
  apikey: string;  // 로스트아크 API 키
};

// 스토어 상태 타입 정의 - 전체 스토어의 상태 구조와 액션(함수)들을 인터페이스로 정의합니다.
interface StoreState {
  darkMode: boolean;
  toggleDarkMode: () => void;

  user: User | null;
  setUser: (user: User | null) => void;

  characters: Character[];
  addCharacter: (character: Character) => void;
  updateCharacter: (id: string, characterData: Partial<Character>) => void;
  removeCharacter: (id: string) => void;
}


interface Character {
  id: string;              // 캐릭터 고유 식별자
  name: string;            // 캐릭터 이름
  class: string;           // 캐릭터 직업
  level: number;           // 캐릭터 레벨
  itemLevel: number;       // 아이템 레벨
  server: string;          // 서버 이름
  expedition: string;      // 원정대 이름
  isMain: boolean;       // 대표 캐릭터 여부
  mainCharacter: string;   // 대표 캐릭터 이름
  equipment: Equipment[]; // 장비 목록

}

interface Equipment {
  id: string;          // 장비 고유 식별자
  name: string;        // 장비 이름
  type: string;        // 장비 종류 (예: 무기, 방어구 등)
  itemLevel: number;   // 장비 아이템 레벨
}

// Zustand 스토어 생성
// create 함수를 호출하여 스토어를 생성하고, persist 미들웨어를 적용합니다.
const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // 다크모드 상태 및 액션 구현
      darkMode: false,  // 초기값은 false (라이트모드)
      // 다크모드 토글 함수 - 현재 상태의 반대 값으로 설정합니다.
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      
      // 유저 상태 및 액션 구현
      user: null,  // 초기값은 null (로그인하지 않은 상태)
      // 사용자 정보를 설정하는 함수 - 로그인/로그아웃 시 사용됩니다.
      setUser: (user) => set({ user }),
      
      // 캐릭터 관련 상태 및 액션 구현
      characters: [],  // 초기값은 빈 배열
      // 새 캐릭터 추가 함수 - 기존 배열에 새 캐릭터를 추가합니다.
      addCharacter: (character) => 
        set((state) => ({ characters: [...state.characters, character] })),
      // 캐릭터 정보 업데이트 함수 - ID로 캐릭터를 찾아 정보를 업데이트합니다.
      updateCharacter: (id, characterData) => 
        set((state) => ({
          characters: state.characters.map((char) => 
            // ID가 일치하는 캐릭터만 업데이트하고, 나머지는 그대로 유지합니다.
            char.id === id ? { ...char, ...characterData } : char
          ),
        })),
      // 캐릭터 삭제 함수 - ID로 캐릭터를 찾아 배열에서 제거합니다.
      removeCharacter: (id) => 
        set((state) => ({
          characters: state.characters.filter((char) => char.id !== id),
        })),
        
      // 기타 필요한 상태 및 액션들
    }),
    {
      name: 'loa-plan-storage', // 로컬 스토리지에 저장될 때 사용할 키 이름
      // 필요에 따라 추가 옵션 설정 가능
      // 예: storage: sessionStorage - 세션 스토리지 사용
      // 예: partialize: (state) => ({ user: state.user }) - 특정 상태만 저장
    }
  )
);

export default useStore; // 생성한 스토어를 외부에서 사용할 수 있도록 내보냅니다.