import { useEffect, useState } from 'react'

type ViewportType = 'mobile' | 'tablet' | 'desktop' | 'tablet_v2' | null

const MOBILE_MAX = 767
const TABLET_MAX = 1023
const TABLET_V2 = 901
const THROTTLE_DELAY = 100 // ms

export const useViewportType = (): ViewportType | null => {
  const [viewport, setViewport] = useState<ViewportType>(null) // 초기값 null

  useEffect(() => {
    let throttleTimeout: NodeJS.Timeout | null = null

    const handleResize = () => {
      if (throttleTimeout) return

      throttleTimeout = setTimeout(() => {
        const width = window.innerWidth
        if (width <= MOBILE_MAX) {
          setViewport('mobile')
        } else if (width <= TABLET_V2) {
          setViewport('tablet_v2')
        } else if (width <= TABLET_MAX) {
          setViewport('tablet')
        } else {
          setViewport('desktop')
        }
        throttleTimeout = null
      }, THROTTLE_DELAY)
    }

    handleResize() // 초기 랜더링 실행
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (throttleTimeout) clearTimeout(throttleTimeout)
    }
  }, [])

  return viewport
}

export default useViewportType
