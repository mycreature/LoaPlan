import { create } from 'zustand'; // Zustand 라이브러리의 create 함수를 가져옵니다. 상태 관리 스토어를 생성하는 데 사용됩니다.
import { persist } from 'zustand/middleware'; // Zustand의 persist 미들웨어를 가져옵니다. 상태를 로컬 스토리지에 저장하는 데 사용됩니다.

// 유저 타입 정의 - 사용자 정보의 구조를 TypeScript 타입으로 정의합니다.
type User = {
  id: string;      // 사용자 고유 식별자
  name: string;    // 사용자 이름
  email: string;   // 사용자 이메일
};

// 스토어 상태 타입 정의 - 전체 스토어의 상태 구조와 액션(함수)들을 인터페이스로 정의합니다.
interface StoreState {
  // 다크모드 관련 상태 및 액션
  darkMode: boolean;                // 다크모드 활성화 여부 (true/false)
  toggleDarkMode: () => void;       // 다크모드 상태를 전환하는 함수
  
  // 사용자 관련 상태 및 액션
  user: User | null;                // 현재 로그인한 사용자 정보 (없으면 null)
  setUser: (user: User | null) => void; // 사용자 정보를 설정하는 함수
  
  // 로스트아크 캐릭터 관련 상태 및 액션
  characters: Character[];          // 사용자의 모든 캐릭터 목록
  addCharacter: (character: Character) => void;     // 새 캐릭터를 추가하는 함수
  updateCharacter: (id: string, characterData: Partial<Character>) => void; // 기존 캐릭터 정보를 업데이트하는 함수
  removeCharacter: (id: string) => void;           // 캐릭터를 삭제하는 함수
  
  // 기타 필요한 상태 및 액션들
}

// 캐릭터 타입 정의 - 캐릭터 정보의 구조를 TypeScript 타입으로 정의합니다.
interface Character {
  id: string;              // 캐릭터 고유 식별자
  name: string;            // 캐릭터 이름
  class: string;           // 캐릭터 직업 (ex: 버서커, 디스트로이어 등)
  level: number;           // 캐릭터 레벨
  itemLevel: number;       // 아이템 레벨
  server: string;          // 서버 이름
  isMain: boolean;         // 대표 캐릭터 여부
  dailyCompleted: boolean; // 일일 컨텐츠 완료 여부
  weeklyCompleted: boolean; // 주간 컨텐츠 완료 여부
  // 기타 캐릭터 관련 속성
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