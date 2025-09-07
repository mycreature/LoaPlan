import useViewportType from '../hook/useViewportType'
import { useRequireUserOrGuest } from '../hook/useAuthRedirect'
import WeeklyDesktopLayout from '../layouts/weekly/DesktopLayout'
import WeeklyTabletLayout from '../layouts/weekly/TabletLayout'
import WeeklyMobileLayout from '../layouts/weekly/MobileLayout'
import LoadingLayout from '../layouts/LoadingLayout'

const WeeklyGold = () => {
  const isViewport = useViewportType()

  const checked = useRequireUserOrGuest('/login')

  if (!checked) return null
  else {
    return (
      <div className='flex h-full w-full justify-center'>
        {isViewport === 'desktop' ? (
          <WeeklyDesktopLayout />
        ) : isViewport === 'tablet' ? (
          <WeeklyTabletLayout />
        ) : isViewport === 'mobile' ? (
          <WeeklyMobileLayout />
        ) : (
          <LoadingLayout />
        )}
      </div>
    )
  }
}

export default WeeklyGold
