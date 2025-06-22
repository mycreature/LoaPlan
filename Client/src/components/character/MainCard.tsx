import { useCharacterStore } from '../../stores/CharacterStore'
import Loading from '../ui/Loading'

const MainCard = () => {
  const MainCharacter = useCharacterStore((state) => state.MainCharacter)
  const profileLoading = useCharacterStore((state) => state.profileLoading)

  return (
    <div className='mt-[-20px] flex h-40 items-center justify-center'>
      {profileLoading ? (
        // ✅ 로딩 중일 때
        <Loading />
      ) : MainCharacter?.image ? (
        // ✅ 이미지 로드 완료 시
        <img src={MainCharacter.image} alt={MainCharacter.name} />
      ) : (
        // ✅ 에러시
        <span></span>
      )}
    </div>
  )
}
export default MainCard
