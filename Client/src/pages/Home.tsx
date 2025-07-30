// pages/Home.tsx

import useViewportType from '../hook/useViewportType'
import HomeMobileLayout from '../layouts/HomeMobileLayout'
import HomeDesktopLayout from '../layouts/HomeDesktopLayout'
import HomeTabletLayout from '../layouts/HomeTabletLayout'
import { useRequireUserOrGuest } from '../hook/useAuthRedirect'
import LoadingLayout from '../layouts/LoadingLayout'

const Home = () => {
  const isViewport = useViewportType()

  useRequireUserOrGuest('/login')

  return (
    <div className='min-h-screen bg-gray-600 pt-[50px]'>
      {isViewport === 'desktop' ? (
        <HomeDesktopLayout />
      ) : isViewport === 'tablet' ? (
        <HomeTabletLayout />
      ) : isViewport === 'mobile' ? (
        <HomeMobileLayout />
      ) : (
        <LoadingLayout />
      )}
    </div>
  )
}

export default Home
