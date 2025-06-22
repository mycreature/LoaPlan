import { useEffect } from 'react'
import useAccountStore from '../../stores/AccountStore'
import { useCharacterStore } from '../../stores/CharacterStore'

const MainCard = () => {
  const MainCharacter = useCharacterStore((state) => state.MainCharacter)
  const loadProfileData = useCharacterStore((state) => state.loadProfileData) // 함수명 맞춤
  const characterName = useAccountStore((state) => state.character)

  useEffect(() => {
    if (characterName) {
      loadProfileData(characterName)
    }
  }, [characterName, loadProfileData])

  return (
    <div className='mt-[-20px]'>
      <img src={MainCharacter?.image} alt={MainCharacter?.name || '로딩중... '} />
    </div>
  )
}
export default MainCard
