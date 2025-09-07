import useViewportType from '../hook/useViewportType'
import { useRequireUserOrGuest } from '../hook/useAuthRedirect'
import DesktopLayout from '../layouts/weekly/DesktopLayout'
import TabletLayout from '../layouts/weekly/TabletLayout'
import MobileLayout from '../layouts/weekly/MobileLayout'
import LoadingLayout from '../layouts/LoadingLayout'

const WeeklyGold = () => {
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

export default WeeklyGold
