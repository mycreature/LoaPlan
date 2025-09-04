import { useCharacterStore } from '../../stores/api/CharacterStore'
import { useCharacterSelectionStore } from '../../stores/selections/CharacterSelectionStore'
import Loading from '../ui/Loading'
import { useMemo } from 'react'
import Tag from '../ui/Tag'

interface MainCardProps {
  width?: number | string
  height?: number | string
}

const MainCard = ({ width = '100%', height = '100%' }: MainCardProps) => {
  const MainCharacter = useCharacterStore((state) => state.MainCharacter)
  const profileLoading = useCharacterStore((state) => state.profileLoading)
  const SelectedCharacterInfo = useCharacterSelectionStore((state) => state.SelectedCharacterInfo)
  const selectedProfileError = useCharacterSelectionStore((state) => state.profileError)

  // 현재 표시할 캐릭터 정보를 결정
  const character = useMemo(() => {
    return SelectedCharacterInfo || MainCharacter
  }, [SelectedCharacterInfo, MainCharacter])

  const render = useMemo(() => {
    if (profileLoading) {
      return <Loading />
    }

    if (character?.image) {
      return (
        <div className='flex w-full flex-col items-center justify-center gap-4'>
          <img
            src={character.image}
            alt={character.name}
            className='rounded-lg bg-black object-cover'
            style={{ width: width, height: height }}
          />
          <Tag text={character.name} width={width} />
        </div>
      )
    }

    return <span>로딩중...</span>
  }, [profileLoading, character])

  // 에러 처리
  if (selectedProfileError) {
    return <div>이미지 불러오기 실패</div>
  }

  return <div className='flex items-center justify-center'>{render}</div>
}

export default MainCard
