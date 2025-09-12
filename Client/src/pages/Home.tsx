import useViewportType from '../hook/useViewportType'
import MobileLayout from '../layouts/home/MobileLayout'
import DesktopLayout from '../layouts/home/DesktopLayout'
import TabletLayout from '../layouts/home/TabletLayout'
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
          <DesktopLayout />
        ) : isViewport === 'tablet' ? (
          <TabletLayout />
        ) : isViewport === 'mobile' ? (
          <MobileLayout />
        ) : (
          <LoadingLayout />
        )}
      </div>
    )
  }
}

export default Home
