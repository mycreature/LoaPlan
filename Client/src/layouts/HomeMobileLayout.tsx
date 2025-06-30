import Block from '../components/ui/Block'

import MainInfo from '../components/character/MainInfo'
import BarrackList from '../components/barracks/BarrackList'
import { getGoldByLevelRange } from '../utils/expeditionDataUtils'
import { useExpeditionGoldData } from '../hook/useCharacterGoldData'
import PieChartComponent from '../components/charts/PieChart'
import { expeditionColors } from '../styles/colors'
import LevelRangeList from '../components/barracks/LevelRangeList'
import GoldDashboard from '../components/GoldDashboard'

const HomeMobileLayout = () => {
  const expeditionGoldData = getGoldByLevelRange(useExpeditionGoldData() || [])

  return (
    <main className='space-y-[10px] p-[10px]'>
      <div className='grid grid-cols-1 place-items-center gap-y-[10px]'>
        <div className='캐릭터 정보'>
          <Block width={370} height={300}>
            <MainInfo />
          </Block>
        </div>
        <div className='배럭 리스트'>
          <Block width={370} height={300}>
            <BarrackList />
          </Block>
        </div>
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
              <GoldDashboard />
            </div>
          </Block>
        </div>
      </div>
    </main>
  )
}

export default HomeMobileLayout
