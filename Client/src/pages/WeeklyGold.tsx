import useViewportType from '../hook/useViewportType'

import { useRequireUserOrGuest } from '../hook/useAuthRedirect'
import WeeklyDesktopLayout from '../layouts/WeeklyDesktopLayout'
import WeeklyTabletLayout from '../layouts/WeeklyTabletLayout'
import WeeklyMobileLayout from '../layouts/WeeklyMobileLayout'

const WeeklyGold = () => {
  const isViewport = useViewportType()

  useRequireUserOrGuest('/login')

  return (
    <div className='min-h-screen bg-gray-600 pt-[50px]'>
      {isViewport === 'desktop' ? (
        <WeeklyDesktopLayout />
      ) : isViewport === 'tablet' ? (
        <WeeklyTabletLayout />
      ) : (
        <WeeklyMobileLayout />
      )}
    </div>
  )
}

export default WeeklyGold
