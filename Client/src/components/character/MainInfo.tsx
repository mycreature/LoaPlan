import { useCharacterStore } from '../../stores/api/CharacterStore'
import { useCharacterSelectionStore } from '../../stores/selections/CharacterSelectionStore'
import Loading from '../ui/Loading'
import Tag from '../ui/Tag'
import { useMemo } from 'react'

const MainInfo = () => {
  const MainCharacter = useCharacterStore((state) => state.MainCharacter)
  const profileLoading = useCharacterStore((state) => state.profileLoading)

  const SelectedCharacterInfo = useCharacterSelectionStore((state) => state.SelectedCharacterInfo)
  const SelectedProfileError = useCharacterSelectionStore((state) => state.profileError)

  // 캐릭터 정보를 통합하여 관리
  const characterData = useMemo(() => {
    return SelectedCharacterInfo || MainCharacter
  }, [SelectedCharacterInfo, MainCharacter])

  // 레벨 파싱 로직을 메모이제이션
  const parsedLevel = useMemo(() => {
    if (!characterData?.level) return null
    return Number(characterData.level.replace(/,/g, ''))
  }, [characterData?.level])

  const parsedCharacterLevel = useMemo(() => {
    if (!characterData?.CharacterLevel) return null
    return Number(characterData.CharacterLevel)
  }, [characterData?.CharacterLevel])

  // 공통 렌더링 함수 - UI 구성 정확히 일치
  const renderMaininfo = (character: any) => {
    return (
      <div className={`flex h-full flex-col items-center justify-center gap-6`}>
        <div className={`flex w-full items-center gap-5`}>
          <Tag text='닉네임'></Tag>
          <h3 className='leading-none text-black'>{character.name}</h3>
        </div>
        <div className={`flex w-full items-center gap-5`}>
          <Tag text='서버'></Tag>
          <h3 className='leading-none text-black'>{character.server}</h3>
        </div>
        <div className={`flex w-full items-center gap-5`}>
          <Tag text='클래스'></Tag>
          <h3 className='leading-none text-black'>{character.class}</h3>
        </div>
        <div className={`flex w-full items-center gap-5`}>
          <Tag text='레벨'></Tag>
          <h3 className='leading-none text-black'>
            {Number(character.level?.replace(/,/g, '')) || parsedLevel || '정보 없음'}
          </h3>
        </div>
        <div className={`flex w-full items-center gap-5`}>
          <Tag text='전투레벨'></Tag>
          <h3 className='leading-none text-black'>
            {Number(character.CharacterLevel) || parsedCharacterLevel}
          </h3>
        </div>
        <div className={`flex w-full items-center gap-5`}>
          <Tag text='전투력'></Tag>
          <h3 className='leading-none text-black'>{character.combatPower}</h3>
        </div>
      </div>
    )
  }

  if (SelectedProfileError) {
    return <div className='text-center text-black'>정보 불러오기 실패</div>
  }

  if (SelectedCharacterInfo) {
    return <div className='w-full'>{renderMaininfo(SelectedCharacterInfo)}</div>
  }

  return (
    <div className=''>
      {profileLoading && !MainCharacter ? (
        // 로딩 중일 때
        <div className='flex justify-center'>
          <Loading />
        </div>
      ) : MainCharacter?.image ? (
        // 이미지 로드 완료 시
        renderMaininfo(MainCharacter)
      ) : (
        // 에러시
        <span></span>
      )}
    </div>
  )
}

export default MainInfo
