import { useEffect } from 'react'
import MainCard from '../components/character/MainCard'
import Block from '../components/ui/Block'
import useAccountStore from '../stores/AccountStore'
import { useCharacterStore } from '../stores/CharacterStore'
import MainInfo from '../components/character/MainInfo'
import BarrackList from '../components/barracks/BarrackList'

const Home = () => {
  // localStorage의 apikey, character 값을 가져와 정보 호출 (캐릭터 정보, 배럭 정보, 원정대 정보)
  const loadProfileData = useCharacterStore((state) => state.loadProfileData)
  const loadCharInfoData = useCharacterStore((state) => state.loadCharInfoData)
  const loadExpeditionData = useCharacterStore((state) => state.loadExpeditionData)

  // 현재 localStorage에 저장된 캐릭터 이름을 가져옴 (사용자가 선택한 대표 캐릭터)
  const characterName = useAccountStore((state) => state.character)

  useEffect(() => {
    if (characterName) {
      loadProfileData(characterName)
      loadCharInfoData(characterName)
      loadExpeditionData(characterName)
    }
  }, [characterName, loadProfileData, loadCharInfoData, loadExpeditionData])

  return (
    <div className='min-h-screen bg-gray-600 pt-[50px]'>
      <main className='space-y-[10px] p-[10px]'>
        <div className='grid grid-cols-1 place-items-center gap-y-[10px] md:flex md:justify-center md:gap-x-[14px] lg:gap-x-[10px]'>
          {/* 캐릭터 이미지 */}
          <div className='hidden lg:block'>
            <Block width={250} height={300} darkColor='bg-[#15181D]' lightColor='bg-[#15181D]'>
              <MainCard />
            </Block>
          </div>
          {/* 캐릭터 정보 */}
          <div className='hidden md:block'>
            <Block width={276} height={300}>
              <MainInfo />
            </Block>
          </div>
          {/* 캐릭터 정보 (모바일) */}
          <div className='block md:hidden'>
            <Block width={370} height={300}>
              <MainInfo />
            </Block>
          </div>
          {/* 배럭 리스트 */}
          <div className='hidden md:block'>
            <Block width={458} height={300}>
              <BarrackList />
            </Block>
          </div>
          {/* 배럭 리스트 (모바일) */}
          <div className='block md:hidden'>
            <Block width={370} height={300} />
          </div>
        </div>
        {/* 차트 부분 */}
        <div className='flex justify-center'>
          <div className='hidden lg:block'>
            <Block width={1004} height={300}></Block>
          </div>
          <div className='hidden md:block lg:hidden'>
            <Block width={748} height={300}></Block>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
