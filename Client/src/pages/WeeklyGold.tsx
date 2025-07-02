import BarrackList from '../components/barracks/BarrackList'
import GoldDashboard from '../components/GoldDashboard'
import RaidSelector from '../components/selector/RaidSelector'
import Block from '../components/ui/Block'

const WeeklyGold = () => {
  return (
    <div className='min-h-screen bg-gray-600 pt-[50px]'>
      <main className='space-y-[10px] p-[10px]'>
        <div className='flex justify-center gap-x-[10px]'>
          <Block width={300} height={300}>
            <BarrackList islevel={false} />
          </Block>
          <Block width={694} height={300}>
            <RaidSelector />
          </Block>
        </div>
        <div className='flex justify-center gap-x-[10px]'>
          <Block width={300} height={300}>
            <GoldDashboard width={270} height={270} />
          </Block>
          <Block width={694} height={300}></Block>
        </div>
      </main>
    </div>
  )
}

export default WeeklyGold
