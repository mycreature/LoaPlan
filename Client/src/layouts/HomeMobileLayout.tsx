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
    <main className='flex flex-col space-y-[10px]'>
      <div className='대표 캐릭터 이미지'>
        <Block width={370} height={698} title='메인 정보'>
          <div className='flex flex-col gap-6'>
            <MainCard width={338} height={254} />
            <MainInfo />
          </div>
        </Block>
      </div>

      <div className='배럭 리스트 (메인 캐릭터 제외)'>
        <Block width={370} height={387} title='원정대 리스트'>
          <BarrackList />
        </Block>
      </div>
      {expeditionGoldData.length === 0 ? (
        <Block width={370} height={230} title=''>
          <div className='flex flex-col items-center justify-center gap-4 opacity-80'>
            <h3 className='text-black'>주간 골드 설정을 해주세요</h3>
            <Button text='설정하기' onClick={() => navigate('/Weekly')} />
          </div>
        </Block>
      ) : (
        <>
          <div className='차트'>
            <Block width={370} title='주간 골드 요약'>
              <SummaryPreview viewport='mobile' />
            </Block>
          </div>
        </>
      )}
    </main>
  )
}

export default HomeMobileLayout
