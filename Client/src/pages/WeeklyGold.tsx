import BarrackList from '../components/barracks/BarrackList'
import GoldDashboard from '../components/GoldDashboard'
import RaidSelector from '../components/selector/RaidSelector'
import Block from '../components/ui/Block'
import { useExpeditionGoldData } from '../hook/useExpeditionGoldData'
import useLoaData from '../hook/useLoaData'
import { useCharacterSelectionStore } from '../stores/selections/CharacterSelectionStore'

const WeeklyGold = () => {
  useLoaData()
  const expeditionGoldData = useExpeditionGoldData() || []
  const SelectedCharacterInfo = useCharacterSelectionStore((state) => state.SelectedCharacterInfo)

  return (
    <div className='min-h-screen bg-gray-600 pt-[50px]'>
      <main className='space-y-[10px] p-[10px]'>
        <div className='flex justify-center gap-x-[10px]'>
          <Block width={300} height={385}>
            <BarrackList islevel={false} />
          </Block>
          <Block width={694} height={300}>
            {expeditionGoldData.length !== 0 && SelectedCharacterInfo ? (
              <div className='flex h-[95%] w-[95%] gap-2'>
                <div className='flex flex-col gap-2'>
                  <h3 className='min-w-[456px] font-extrabold text-black'>주간 골드 선택</h3>
                  <RaidSelector />
                </div>
                <Block width={200} height={150}></Block>
              </div>
            ) : (
              <div className='flex h-[95%] w-[95%] gap-2'>
                <div className='flex w-full flex-col'>
                  <h3 className='min-w-[456px] font-extrabold text-black'>주간 골드 선택</h3>
                  <h3 className='my-auto flex justify-center text-black'>
                    왼쪽 캐릭터를 선택해주세요.
                  </h3>
                </div>
              </div>
            )}
          </Block>
        </div>
        <div className='flex justify-center gap-x-[10px]'>
          <Block width={300} height={270}>
            <GoldDashboard width={270} height={250} />
          </Block>
          <Block width={694} height={270}></Block>
        </div>
      </main>
    </div>
  )
}

export default WeeklyGold
