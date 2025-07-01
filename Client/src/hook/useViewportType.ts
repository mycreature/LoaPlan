import { useEffect, useState } from 'react'

type ViewportType = 'mobile' | 'tablet' | 'desktop'

const MOBILE_MAX = 767
const TABLET_MAX = 1023
const THROTTLE_DELAY = 100 // ms (원하면 조정 가능)

export const useViewportType = (): ViewportType => {
  const [viewport, setViewport] = useState<ViewportType>('desktop')

  useEffect(() => {
    let throttleTimeout: NodeJS.Timeout | null = null

    const handleResize = () => {
      if (throttleTimeout) return

      throttleTimeout = setTimeout(() => {
        const width = window.innerWidth
        if (width <= MOBILE_MAX) {
          setViewport('mobile')
        } else if (width <= TABLET_MAX) {
          setViewport('tablet')
        } else {
          setViewport('desktop')
        }
        throttleTimeout = null
      }, THROTTLE_DELAY)
    }

    handleResize() // 초기 렌더링시 체크
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (throttleTimeout) clearTimeout(throttleTimeout)
    }
  }, [])

  return viewport
}

export default useViewportType
