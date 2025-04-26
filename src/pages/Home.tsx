import DefalutBlock from '../components/block/defalutBlock'
import Button from '../components/ui/Button'

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-600'>
      <main className='mx-auto max-w-3xl p-8 text-center'>
        <h1 className='mb-6 text-4xl font-bold'>Welcome to My App</h1>
        <p className='mb-4 text-gray-700'>
          React + TypeScript + Tailwind 기반 기본 메인 페이지입니다.
        </p>
        <Button text='시작하기' />
        <DefalutBlock />
      </main>
    </div>
  )
}

export default Home
