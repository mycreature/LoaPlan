import useViewportType from '../hook/useViewportType'
import HomeMobileLayout from '../layouts/HomeMobileLayout'
import HomeDesktopLayout from '../layouts/HomeDesktopLayout'
import HomeTabletLayout from '../layouts/HomeTabletLayout'
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
