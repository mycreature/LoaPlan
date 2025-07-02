// pages/Home.tsx

import useViewportType from '../hook/useViewportType'
import HomeMobileLayout from '../layouts/HomeMobileLayout'
import HomeDesktopLayout from '../layouts/HomeDesktopLayout'
import HomeTabletLayout from '../layouts/HomeTabletLayout'
import { useRequireUserOrGuest } from '../hook/useAuthRedirect'
import useLoaData from '../hook/useLoaData'

const Home = () => {
  const isViewport = useViewportType()

  useRequireUserOrGuest('/login')

  useLoaData()

  return (
    <div className='min-h-screen bg-gray-600 pt-[50px]'>
      {isViewport === 'desktop' ? (
        <HomeDesktopLayout />
      ) : isViewport === 'tablet' ? (
        <HomeTabletLayout />
      ) : (
        <HomeMobileLayout />
      )}
    </div>
  )
}

export default Home
