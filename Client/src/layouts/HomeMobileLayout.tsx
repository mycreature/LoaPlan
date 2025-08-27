import Block from '../components/ui/Block'
import MainInfo from '../components/character/MainInfo'
import BarrackList from '../components/barracks/BarrackList'
import { useExpeditionGoldData } from '../hook/useExpeditionGoldData'
import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import MainCard from '../components/character/MainCard'
import SummaryPreview from '../components/Summary/SummaryPreview'

const HomeMobileLayout = () => {
  const expeditionGoldData = useExpeditionGoldData()

  const navigate = useNavigate()

  return (
    <main className='space-y-[10px] p-[10px]'>
      <div className='grid grid-cols-1 place-items-center gap-y-[10px]'>
        <div className='대표 캐릭터 이미지'>
          <Block width={370} height={295} darkColor='bg-[#15181D]' lightColor='bg-[#15181D]'>
            <MainCard />
          </Block>
        </div>
        <div className='캐릭터 정보'>
          <Block width={370} height={374}>
            <div className='flex h-full w-full flex-col gap-5 p-4'>
              <h3 className='leading-none font-extrabold text-black'> 메인 정보</h3>
              <MainInfo />
            </div>
          </Block>
        </div>
        <div className='배럭 리스트 (메인 캐릭터 제외)'>
          <Block width={370} height={387}>
            <div className='flex h-full w-full flex-col gap-5 p-4'>
              <h3 className='leading-none font-extrabold text-black'>원정대 리스트</h3>
              <BarrackList />
            </div>
          </Block>
        </div>
        {expeditionGoldData.length === 0 ? (
          <Block width={370} height={230}>
            <div className='flex flex-col items-center justify-center gap-4 opacity-80'>
              <h3 className='text-black'>주간 골드 설정을 해주세요</h3>
              <Button text='설정하기' onClick={() => navigate('/Weekly')} />
            </div>
          </Block>
        ) : (
          <>
            <div className='차트'>
              <Block width={370}>
                <div className='flex h-full w-full flex-col gap-5 p-4'>
                  <h3 className='mr-auto ml-0 leading-none font-extrabold text-black'>
                    주간 골드 요약
                  </h3>
                  <div className='flex min-h-[180px] items-center justify-center'>
                    <SummaryPreview viewport='mobile' />
                  </div>
                </div>
              </Block>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default HomeMobileLayout
