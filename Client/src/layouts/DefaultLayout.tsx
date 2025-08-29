import { ReactNode } from 'react'
import Header from './Header'
import useLoaData from '../hook/useLoaData'

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
      <div className='mt-[50px] flex flex-grow justify-center p-[10px]'>{children}</div>
    </div>
  )
}

export default Layout
