import Block from '../components/Block'

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-600'>
      <main className='mx-auto max-w-3xl p-[10px] text-center'></main>
      <div className='flex items-center justify-center space-x-[10px] text-center'>
        <Block width={250} height={300} />
        <Block width={276} height={300} />
        <Block width={458} height={300} />
      </div>
    </div>
  )
}

export default Home
