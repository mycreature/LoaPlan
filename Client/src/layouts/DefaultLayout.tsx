import { ReactNode } from 'react'
import Header from './Header'
import useLoaData from '../hook/useLoaData'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  useLoaData()

  return (
    <div className='flex min-h-screen flex-col bg-gray-600'>
      <div className='fixed top-0 z-50 w-full'>
        <Header />
      </div>
      <div className='mt-[50px] mb-[40px] flex flex-grow justify-center p-[10px]'>{children}</div>
      <div className='fixed bottom-0 z-50 w-full'>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
