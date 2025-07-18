import { useCharacterStore } from '../../stores/api/CharacterStore'
import { useCharacterSelectionStore } from '../../stores/selections/CharacterSelectionStore'
import Loading from '../ui/Loading'
import Tag from '../ui/Tag'

const MainInfo = () => {
  const MainCharacter = useCharacterStore((state) => state.MainCharacter)
  const profileLoading = useCharacterStore((state) => state.profileLoading)

  const SelectedCharacterInfo = useCharacterSelectionStore((state) => state.SelectedCharacterInfo)
  const SelectedProfileError = useCharacterSelectionStore((state) => state.profileError)

  if (SelectedProfileError) return <div className='text-center text-black'>정보 불러오기 실패</div>

  if (SelectedCharacterInfo) {
    return (
      <div className='w-full'>
        <div className='items-center justify-center space-y-6'>
          <div className='flex w-full items-center gap-6'>
            <Tag text='닉네임'></Tag>
            <h3 className='text-black'>{SelectedCharacterInfo.name}</h3>
          </div>
          <div className='flex w-full items-center gap-6'>
            <Tag text='서버'></Tag>
            <h3 className='text-black'>{SelectedCharacterInfo.server}</h3>
          </div>
          <div className='flex w-full items-center gap-6'>
            <Tag text='클래스'></Tag>
            <h3 className='text-black'>{SelectedCharacterInfo.class}</h3>
          </div>
          <div className='flex w-full items-center gap-6'>
            <Tag text='레벨'></Tag>
            <h3 className='text-black'>{Number(SelectedCharacterInfo.level?.replace(/,/g, ''))}</h3>
          </div>
          <div className='flex w-full items-center gap-6'>
            <Tag text='전투레벨'></Tag>
            <h3 className='text-black'>{Number(SelectedCharacterInfo.CharacterLevel)}</h3>
          </div>
          <div className='flex w-full items-center gap-6'>
            <Tag text='전투력'></Tag>
            <h3 className='text-black'>{SelectedCharacterInfo.combatPower}</h3>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='w-[80%]'>
      {profileLoading && !MainCharacter ? (
        // ✅ 로딩 중일 때
        <div className='flex justify-center'>
          <Loading />
        </div>
      ) : MainCharacter?.image ? (
        // ✅ 이미지 로드 완료 시
        <div className='items-center justify-center space-y-6'>
          <div className='flex w-full items-center space-x-6'>
            <Tag text='닉네임' className='w-[100px]'></Tag>
            <h3 className='text-black'>{MainCharacter.name}</h3>
          </div>
          <div className='flex w-full items-center space-x-6'>
            <Tag text='서버' className='w-[100px]'></Tag>
            <h3 className='text-black'>{MainCharacter.server}</h3>
          </div>
          <div className='flex w-full items-center space-x-6'>
            <Tag text='클래스' className='w-[100px]'></Tag>
            <h3 className='text-black'>{MainCharacter.class}</h3>
          </div>
          <div className='flex w-full items-center space-x-6'>
            <Tag text='레벨' className='w-[100px]'></Tag>
            <h3 className='text-black'>{Number(MainCharacter.level?.replace(/,/g, ''))}</h3>
          </div>
          <div className='flex w-full items-center space-x-6'>
            <Tag text='전투레벨' className='w-[100px]'></Tag>
            <h3 className='text-black'>{Number(MainCharacter.CharacterLevel)}</h3>
          </div>
          <div className='flex w-full items-center space-x-6'>
            <Tag text='전투력' className='w-[100px]'></Tag>
            <h3 className='text-black'>{MainCharacter.combatPower}</h3>
          </div>
        </div>
      ) : (
        // ✅ 에러시
        <span></span>
      )}
    </div>
  )
}
export default MainInfo
