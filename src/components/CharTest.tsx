import { use, useEffect } from 'react'
import { useCharacterStore } from '../stores/CharacterStore'

const CharTest = () => {
  const { fetchProfileData, fetchExpeditionData, profileLoading } = useCharacterStore()

  useEffect(() => {
    fetchProfileData('이크리처') // 여기에 테스트할 캐릭터 이름 넣기
  }, [])

  useEffect(() => {
    if (profileLoading == false) {
      console.log(useCharacterStore.getState())
    }
  }, [profileLoading])

  return (
    <div>
      <h2>프로필 테스트</h2>
    </div>
  )
}

export default CharTest
