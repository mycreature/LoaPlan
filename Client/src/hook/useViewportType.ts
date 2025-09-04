import { useEffect, useState } from 'react'

const MOBILE_MAX = 767
const TABLET_MAX = 1023
const THROTTLE_DELAY = 100 // ms

interface widthprops {
  widthValue?: boolean
}

const useViewportType = ({ widthValue = false }: widthprops = {}) => {
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [width, setWidth] = useState(window.innerWidth)

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
        setWidth(width)
        throttleTimeout = null
      }, THROTTLE_DELAY)
    }

    handleResize() // 초기 실행
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (throttleTimeout) clearTimeout(throttleTimeout)
    }
  }, [])

  if (widthValue) return width

  return viewport
}

export default useViewportType
