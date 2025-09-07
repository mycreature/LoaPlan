import BarrackList from '../../components/barracks/BarrackList'
import SingleBarChartComponent from '../../components/charts/SingleBarChart'
import BarChartComponent from '../../components/charts/BarChart'
import GoldDashboard from '../../components/GoldDashboard'
import RaidSelector from '../../components/selector/RaidSelector'
import Block from '../../components/ui/Block'
import { useExpeditionGoldData } from '../../hook/useExpeditionGoldData'
import { useCharacterSelectionStore } from '../../stores/selections/CharacterSelectionStore'
import { DefaultSelector } from '../../components/selector/DefaultSelector'

const MobileLayout = () => {
  const expeditionGoldData = useExpeditionGoldData() || []
  const SelectedCharacterInfo = useCharacterSelectionStore((state) => state.SelectedCharacterInfo)

  return (
    <main className='grid w-full grid-cols-1 justify-center gap-y-[10px]'>
      <Block height={387} title='원정대 리스트'>
        <BarrackList />
      </Block>
      <Block height={299} title='주간 골드 선택'>
        <div className='flex h-full flex-col'>
          {expeditionGoldData.length !== 0 && SelectedCharacterInfo ? (
            <RaidSelector SelectedCharacterInfo={SelectedCharacterInfo} />
          ) : (
            <DefaultSelector />
          )}
        </div>
      </Block>
      <Block height={270} title='주간 골드'>
        <GoldDashboard height={196} GoldData={expeditionGoldData} />
      </Block>
      <Block height={324} title='주간 골드'>
        <BarChartComponent data={expeditionGoldData} />
      </Block>
      <Block height={324} title='주차별 골드 예상치'>
        <SingleBarChartComponent data={expeditionGoldData} />
      </Block>
    </main>
  )
}

export default MobileLayout
