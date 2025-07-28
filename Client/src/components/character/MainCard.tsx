import { useCharacterStore } from '../../stores/api/CharacterStore'
import { useCharacterSelectionStore } from '../../stores/selections/CharacterSelectionStore'
import Loading from '../ui/Loading'
import { useMemo } from 'react'

const MainCard = () => {
  const MainCharacter = useCharacterStore((state) => state.MainCharacter)
  const profileLoading = useCharacterStore((state) => state.profileLoading)

  const SelectedCharacterInfo = useCharacterSelectionStore((state) => state.SelectedCharacterInfo)
  const selectedProfileError = useCharacterSelectionStore((state) => state.profileError)

  // 현재 표시할 캐릭터 정보를 결정
  const currentCharacter = useMemo(() => {
    return SelectedCharacterInfo || MainCharacter
  }, [SelectedCharacterInfo, MainCharacter])

  const render = useMemo(() => {
    if (profileLoading) {
      return <Loading />
    }

    if (currentCharacter?.image) {
      return <img src={currentCharacter.image} alt={currentCharacter.name} />
    }

    return <span>로딩중...</span>
  }, [profileLoading, currentCharacter])

  // 에러 처리
  if (selectedProfileError) {
    return <div>이미지 불러오기 실패</div>
  }

  return <div className='flex items-center justify-center'>{render}</div>
}

export default MainCard
