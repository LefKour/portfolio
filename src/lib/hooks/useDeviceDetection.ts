import { useEffect, useCallback, useState } from 'react'
import { useStore } from '../store'

export const useDeviceDetection = () => {
  const [isClient, setIsClient] = useState(false)
  const deviceType = useStore((state) => state.deviceType)
  const orientation = useStore((state) => state.orientation)
  const screenWidth = useStore((state) => state.screenWidth)
  const screenHeight = useStore((state) => state.screenHeight)
  const isTouchDevice = useStore((state) => state.isTouchDevice)
  const setDeviceInfo = useStore((state) => state.setDeviceInfo)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const updateDeviceInfo = useCallback(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const getDeviceType = (width: number) => {
      if (width < 768) return 'mobile' as const
      if (width < 1024) return 'tablet' as const
      return 'desktop' as const
    }

    const getOrientation = (width: number, height: number) => {
      return width > height ? 'landscape' as const : 'portrait' as const
    }

    setDeviceInfo({
      deviceType: getDeviceType(width),
      orientation: getOrientation(width, height),
      screenWidth: width,
      screenHeight: height,
      isTouchDevice: touchDevice,
    })
  }, [setDeviceInfo])

  useEffect(() => {
    updateDeviceInfo()

    window.addEventListener('resize', updateDeviceInfo)
    window.addEventListener('orientationchange', updateDeviceInfo)

    return () => {
      window.removeEventListener('resize', updateDeviceInfo)
      window.removeEventListener('orientationchange', updateDeviceInfo)
    }
  }, [updateDeviceInfo])

  return {
    deviceType: isClient ? deviceType : 'desktop',
    orientation: isClient ? orientation : 'landscape',
    screenWidth: isClient ? screenWidth : 1920,
    screenHeight: isClient ? screenHeight : 1080,
    isTouchDevice: isClient ? isTouchDevice : false,
    isMobile: isClient ? deviceType === 'mobile' : false,
    isTablet: isClient ? deviceType === 'tablet' : false,
    isDesktop: isClient ? deviceType === 'desktop' : true,
    isPortrait: isClient ? orientation === 'portrait' : false,
    isLandscape: isClient ? orientation === 'landscape' : true,
    isClient,
  }
}