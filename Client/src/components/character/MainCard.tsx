import { useEffect } from 'react'
import { useCharacterStore } from '../../stores/api/CharacterStore'
import { useCharacterSelectionStore } from '../../stores/selections/CharacterSelectionStore'
import Loading from '../ui/Loading'

const MainCard = () => {
  const MainCharacter = useCharacterStore((state) => state.MainCharacter)
  const profileLoading = useCharacterStore((state) => state.profileLoading)

  const selectedCharacter = useCharacterSelectionStore((state) => state.selectedCharacterName)
  const SelectedCharacterInfo = useCharacterSelectionStore((state) => state.SelectedCharacterInfo)
  const loadSelectedProfileData = useCharacterSelectionStore(
    (state) => state.loadSelectedProfileData,
  )
  const profileError = useCharacterSelectionStore((state) => state.profileError)

  useEffect(() => {
    if (selectedCharacter) {
      loadSelectedProfileData(selectedCharacter)
    }
  }, [selectedCharacter])

  if (profileError) return <div>이미지 불러오기 실패</div>

  if (SelectedCharacterInfo) {
    return (
      <div className='flex items-center justify-center'>
        {profileLoading ? (
          // ✅ 로딩 중일 때
          <Loading />
        ) : SelectedCharacterInfo?.image ? (
          // ✅ 이미지 로드 완료 시
          <img src={SelectedCharacterInfo?.image} alt={SelectedCharacterInfo?.name} />
        ) : (
          // ✅ 에러시
          <span>로딩중...</span>
        )}
      </div>
    )
  }

  return (
    <div className='flex items-center justify-center'>
      {profileLoading ? (
        // ✅ 로딩 중일 때
        <Loading />
      ) : MainCharacter?.image ? (
        // ✅ 이미지 로드 완료 시
        <img src={MainCharacter?.image} alt={MainCharacter?.name} />
      ) : (
        // ✅ 에러시
        <span>로딩중...</span>
      )}
    </div>
  )
}
export default MainCard
