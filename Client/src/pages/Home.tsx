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
    <main className='flex h-full w-full justify-center'>
      {isViewport === 'desktop' ? (
        <HomeDesktopLayout />
      ) : isViewport === 'tablet' || isViewport === 'tablet_v2' ? (
        <HomeTabletLayout />
      ) : isViewport === 'mobile' ? (
        <HomeMobileLayout />
      ) : (
        <LoadingLayout />
      )}
    </main>
  )
}

export default Home
