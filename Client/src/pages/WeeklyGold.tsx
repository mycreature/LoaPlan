import useViewportType from '../hook/useViewportType'

import { useRequireUserOrGuest } from '../hook/useAuthRedirect'
import WeeklyDesktopLayout from '../layouts/WeeklyDesktopLayout'
import WeeklyTabletLayout from '../layouts/WeeklyTabletLayout'
import WeeklyMobileLayout from '../layouts/WeeklyMobileLayout'
import LoadingLayout from '../layouts/LoadingLayout'

const WeeklyGold = () => {
  const isViewport = useViewportType()

  useRequireUserOrGuest('/login')

  return (
    <div className='flex h-full w-full justify-center'>
      {isViewport === 'desktop' ? (
        <WeeklyDesktopLayout />
      ) : isViewport === 'tablet' || 'tablet_v2' ? (
        <WeeklyTabletLayout />
      ) : isViewport === 'mobile' ? (
        <WeeklyMobileLayout />
      ) : (
        <LoadingLayout />
      )}
    </div>
  )
}

export default WeeklyGold
