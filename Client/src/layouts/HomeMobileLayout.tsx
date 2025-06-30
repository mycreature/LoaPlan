import Block from '../components/ui/Block'

import MainInfo from '../components/character/MainInfo'

const HomeMobileLayout = () => {
  return (
    <main className='space-y-[10px] p-[10px]'>
      <div className='grid grid-cols-1 place-items-center gap-y-[10px]'>
        <div className='캐릭터 정보'>
          <Block width={370} height={300}>
            <MainInfo />
          </Block>
        </div>
        {/* 배럭 리스트 (모바일) */}
        <div className='배럭 리스트'>
          <Block width={370} height={300} />
        </div>
      </div>
    </main>
  )
}

export default HomeMobileLayout
