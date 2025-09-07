import useViewportType from '../hook/useViewportType'
import { useRequireUserOrGuest } from '../hook/useAuthRedirect'
import LoadingLayout from '../layouts/LoadingLayout'
import DesktopLayout from '../layouts/TimeEfficiency/DesktopLayout'

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
          <div>tablet</div>
        ) : isViewport === 'mobile' ? (
          <div>mobile</div>
        ) : (
          <LoadingLayout />
        )}
      </div>
    )
  }
}

export default TimeEfficiency
