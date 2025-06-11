import Block from '../components/ui/Block'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const account = () => {
  return (
    <div className='min-h-screen bg-gray-600'>
      <main className='space-y-[10px] p-[10px]'>
        <div className='flex items-center justify-center gap-x-[10px]'>
          <Block width={390} height={420}>
            <div className='flex w-[90%] flex-col items-center justify-start space-y-[20px] pb-5'>
              <h2 className='text-black'>계정 정보</h2>
              <div className='flex w-full items-center justify-between space-x-[20px]'>
                <h4 className='w-16 text-center font-bold text-black'>이메일</h4>
                <Input placeholder='이메일' className='w-full' />
              </div>
              <div className='flex w-full items-center justify-between space-x-[20px]'>
                <h4 className='w-16 text-center font-bold text-black'>API</h4>
                <Input placeholder='API KEY' className='w-full' />
              </div>
              <div className='flex w-full items-center justify-between space-x-[20px]'>
                <h4 className='w-16 text-center font-bold text-black'>캐릭터</h4>
                <Input placeholder='대표 캐릭터명' className='w-full' />
              </div>
              <div className='mt-2 w-full space-y-[10px]'>
                <Button text='변경 적용' className='w-full' textClass='text-xl font-extrabold' />
                <Button
                  text='계정 삭제'
                  className='bg-red w-full'
                  textClass='text-xl font-extrabold'
                  mode={false}
                />
              </div>
            </div>
          </Block>
        </div>
      </main>
    </div>
  )
}

export default account
