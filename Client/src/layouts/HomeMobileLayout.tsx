import Block from '../components/ui/Block'
import MainInfo from '../components/character/MainInfo'
import BarrackList from '../components/barracks/BarrackList'
import { useExpeditionGoldData } from '../hook/useExpeditionGoldData'
import PieChartComponent from '../components/charts/PieChart'
import { expeditionColors } from '../styles/colors'
import LevelRangeList from '../components/barracks/LevelRangeList'
import GoldDashboard from '../components/GoldDashboard'
import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'

const HomeMobileLayout = () => {
  const expeditionGoldData = useExpeditionGoldData()
  const navigate = useNavigate()

  return (
    <main className='space-y-[10px] p-[10px]'>
      <div className='grid grid-cols-1 place-items-center gap-y-[10px]'>
        <div className='캐릭터 정보'>
          <Block width={370} height={360}>
            <div className='flex h-full w-full flex-col gap-2 p-3'>
              <h3 className='font-extrabold text-black'> 메인 정보</h3>
              <MainInfo />
            </div>
          </Block>
        </div>
        <div className='배럭 리스트'>
          <Block width={370} height={360}>
            <BarrackList />
          </Block>
        </div>
        {expeditionGoldData.length === 0 ? (
          <Block width={370} height={230}>
            <div className='flex w-[90%] flex-col items-center justify-center gap-4 opacity-80'>
              <h3 className='text-black'>주간 골드 설정을 해주세요</h3>
              <Button text='설정하기' onClick={() => navigate('/Weekly')} />
            </div>
          </Block>
        ) : (
          <>
            <div className='차트'>
              <Block width={370} height={230}>
                <PieChartComponent
                  data={expeditionGoldData}
                  colors={expeditionColors}
                  width={200}
                  height={200}
                  outerRadius={100}
                />
              </Block>
            </div>

            <div className='LevelRangeList'>
              <Block width={370} height={220}>
                <div className='my-auto'>
                  <LevelRangeList />
                </div>
              </Block>
            </div>

            <div className='GoldDashboard'>
              <Block width={370} height={220}>
                <div className='my-auto'>
                  <GoldDashboard GoldData={expeditionGoldData} />
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
