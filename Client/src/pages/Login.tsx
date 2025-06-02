import Block from '../components/ui/Block'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const login = () => {
  return (
    <div className='min-h-screen bg-gray-600'>
      <main className='space-y-[10px] p-[10px]'>
        <div className='flex justify-center gap-x-[10px]'>
          <Block width={390} height={450}>
            <div className='flex h-full flex-col items-center justify-start'>
              <h2 className='pt-3 text-black'>로그인</h2>
              <div className='mt-12 w-[90%] space-y-[20px]'>
                <Input placeholder='이메일' className='w-full' />
                <Input placeholder='비밀번호' className='w-full' />
              </div>
              <div className='mt-8 w-[90%] space-y-[10px]'>
                <Button text='로그인' className='w-full' textStyle='text-xl font-extrabold' />
                <Button text='회원가입' className='w-full' textStyle='text-xl font-extrabold' />
                <Button
                  text='Google 로그인'
                  className='w-full text-black'
                  darkColor='bg-white'
                  lightColor='bg-gray'
                  textStyle='text-xl font-extrabold'
                />
              </div>
            </div>
          </Block>
        </div>
      </main>
    </div>
  )
}

export default login
