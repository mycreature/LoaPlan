import { useEffect, useState } from 'react'

type ViewportType = 'mobile' | 'tablet' | 'desktop'

const MOBILE_MAX = 767
const TABLET_MAX = 1023

export const useViewportType = (): ViewportType => {
  const [viewport, setViewport] = useState<ViewportType>('desktop')

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width <= MOBILE_MAX) {
        setViewport('mobile')
      } else if (width <= TABLET_MAX) {
        setViewport('tablet')
      } else {
        setViewport('desktop')
      }
    }

    handleResize() // 초기 렌더 시 바로 체크
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return viewport
}

export default useViewportType
