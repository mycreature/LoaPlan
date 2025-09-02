import BarrackList from '../components/barracks/BarrackList'
import SingleBarChartComponent from '../components/charts/SingleBarChart'
import BarChartComponent from '../components/charts/BarChart'
import GoldDashboard from '../components/GoldDashboard'
import RaidSelector from '../components/selector/RaidSelector'
import Block from '../components/ui/Block'
import { useExpeditionGoldData } from '../hook/useExpeditionGoldData'
import { useCharacterSelectionStore } from '../stores/selections/CharacterSelectionStore'

const WeeklyMobileLayout = () => {
  const expeditionGoldData = useExpeditionGoldData() || []
  const SelectedCharacterInfo = useCharacterSelectionStore((state) => state.SelectedCharacterInfo)

  return (
    <main className='flex flex-col justify-center gap-y-[10px]'>
      <Block width={370} height={387} title='원정대 리스트'>
        <BarrackList />
      </Block>
      <Block width={370} height={299} title='주간 골드 선택'>
        <div className='mx-auto flex h-full w-[322px] flex-col'>
          {expeditionGoldData.length !== 0 && SelectedCharacterInfo ? (
            <RaidSelector SelectedCharacterInfo={SelectedCharacterInfo} slideWidth={338} />
          ) : (
            <div className='flex h-full w-full flex-col items-center justify-center gap-1'>
              <h3 className='text-black'>원정대 리스트를 선택해주세요</h3>
              <h4 className='text-black opacity-60'>
                (또는 장기 미접속으로 인한 정보 불러오기 실패)
              </h4>
            </div>
          )}
        </div>
      </Block>
      <Block width={370} height={270} title='주간 골드'>
        <GoldDashboard height={196} GoldData={expeditionGoldData} />
      </Block>
      <Block width={370} height={324} title='주간 골드'>
        <BarChartComponent data={expeditionGoldData} />
      </Block>
      <Block width={370} height={324} title='주차별 골드 예상치'>
        <SingleBarChartComponent data={expeditionGoldData} />
      </Block>
    </main>
  )
}

export default WeeklyMobileLayout
