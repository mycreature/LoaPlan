import BarrackList from '../components/barracks/BarrackList'
import SingleBarChartComponent from '../components/charts/SingleBarChart'
import BarChartComponent from '../components/charts/BarChart'
import GoldDashboard from '../components/GoldDashboard'
import RaidSelector from '../components/selector/RaidSelector'
import Block from '../components/ui/Block'
import { useExpeditionGoldData } from '../hook/useExpeditionGoldData'
import { useCharacterSelectionStore } from '../stores/selections/CharacterSelectionStore'
import { DefaultSelector } from '../components/selector/DefaultSelector'

const WeeklyTabletLayout = () => {
  const expeditionGoldData = useExpeditionGoldData() || []
  const SelectedCharacterInfo = useCharacterSelectionStore((state) => state.SelectedCharacterInfo)

  return (
    <main className='grid w-full grid-cols-[300px_1fr] gap-[10px]'>
      <Block height={303} title='주간 골드 선택' className='col-span-2'>
        <div className='mx-auto flex h-full flex-col'>
          {expeditionGoldData.length !== 0 && SelectedCharacterInfo ? (
            <RaidSelector SelectedCharacterInfo={SelectedCharacterInfo} />
          ) : (
            <DefaultSelector />
          )}
        </div>
      </Block>

      <div className='row-span-1 flex flex-col gap-[10px]'>
        <Block width={300} height={387} title='원정대 리스트'>
          <BarrackList />
        </Block>

        <Block width={300} height={270} title='주간 골드'>
          <GoldDashboard height={196} GoldData={expeditionGoldData} />
        </Block>
      </div>

      <div className='row-span-1 flex flex-col gap-[10px]'>
        <Block height={329} title='골드 차트'>
          <BarChartComponent data={expeditionGoldData} />
        </Block>

        <Block height={328} title='주차별 골드 예상치'>
          <SingleBarChartComponent data={expeditionGoldData} />
        </Block>
      </div>
    </main>
  )
}

export default WeeklyTabletLayout
