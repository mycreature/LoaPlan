import useViewportType from '../hook/useViewportType'
import { useRequireUserOrGuest } from '../hook/useAuthRedirect'
import LoadingLayout from '../layouts/LoadingLayout'
import DesktopLayout from '../layouts/TimeEfficiency/DesktopLayout'
import TabletLayout from '../layouts/TimeEfficiency/TabletLayout'
import MobileLayout from '../layouts/TimeEfficiency/MobileLayout'

const TimeEfficiency = () => {
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

export default TimeEfficiency
