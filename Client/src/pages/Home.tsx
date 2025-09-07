import useViewportType from '../hook/useViewportType'
import HomeMobileLayout from '../layouts/home/HomeMobileLayout'
import HomeDesktopLayout from '../layouts/home/HomeDesktopLayout'
import HomeTabletLayout from '../layouts/home/HomeTabletLayout'
import { useRequireUserOrGuest } from '../hook/useAuthRedirect'
import LoadingLayout from '../layouts/LoadingLayout'

const Home = () => {
  const isViewport = useViewportType()

  const checked = useRequireUserOrGuest('/login')

  if (!checked) return null
  else {
    return (
      <div className='flex h-full w-full justify-center'>
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
}

export default Home
