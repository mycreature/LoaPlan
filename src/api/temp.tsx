import { useEffect } from 'react'
import Block from '../components/Block'
import instance from './instance'

const Home = () => {
  // API 호출 함수
  const getAPIData = async () => {
    try {
      const res = await instance.post('markets/items', {
        Sort: 'GRADE',
        CategoryCode: 50010,
        ItemName: '오레하',
        PageNo: 1,
        SortCondition: 'ASC',
      })
      console.log('✅ 오레하 아이템 데이터:', res.data)
    } catch (error) {
      console.error('❌ API 호출 실패:', error)
    }
  }

  useEffect(() => {
    getAPIData()
  }, [])

  return (
    <div className='min-h-screen bg-gray-600'>
      <main className='p-4'>
        <h1 className='mb-4 text-xl text-white'>홈페이지 (API 테스트)</h1>
        <Block width={300} height={200} />
      </main>
    </div>
  )
}

export default Home
