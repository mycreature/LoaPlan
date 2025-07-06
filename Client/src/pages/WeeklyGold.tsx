import BarrackList from '../components/barracks/BarrackList'
import GoldDashboard from '../components/GoldDashboard'
import RaidSelector from '../components/selector/RaidSelector'
import Block from '../components/ui/Block'
import useLoaData from '../hook/useLoaData'

const WeeklyGold = () => {
  useLoaData()
  return (
    <div className='min-h-screen bg-gray-600 pt-[50px]'>
      <main className='space-y-[10px] p-[10px]'>
        <div className='flex justify-center gap-x-[10px]'>
          <Block width={300} height={385}>
            <BarrackList islevel={false} />
          </Block>
          <Block width={694} height={300}>
            <div className='flex h-[95%] flex-col gap-2'>
              <h3 className='font-extrabold text-black'>주간 골드 선택</h3>
              <RaidSelector />
            </div>
            <Block width={200} height={150}></Block>
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
