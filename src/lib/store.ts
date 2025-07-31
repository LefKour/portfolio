import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type DeviceType = 'mobile' | 'tablet' | 'desktop'
type Orientation = 'portrait' | 'landscape'

interface DeviceState {
  deviceType: DeviceType
  orientation: Orientation
  screenWidth: number
  screenHeight: number
  isTouchDevice: boolean
  setDeviceInfo: (info: {
    deviceType: DeviceType
    orientation: Orientation
    screenWidth: number
    screenHeight: number
    isTouchDevice: boolean
  }) => void
}

interface AppState extends DeviceState {}

const getDeviceType = (width: number): DeviceType => {
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

const getOrientation = (width: number, height: number): Orientation => {
  return width > height ? 'landscape' : 'portrait'
}

const getInitialDeviceInfo = () => {
  if (typeof window === 'undefined') {
    return {
      deviceType: 'desktop' as DeviceType,
      orientation: 'landscape' as Orientation,
      screenWidth: 1920,
      screenHeight: 1080,
      isTouchDevice: false,
    }
  }

  const width = window.innerWidth
  const height = window.innerHeight
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  return {
    deviceType: getDeviceType(width),
    orientation: getOrientation(width, height),
    screenWidth: width,
    screenHeight: height,
    isTouchDevice,
  }
}

export const useStore = create<AppState>()(
  devtools(
    (set, get) => ({
      ...getInitialDeviceInfo(),
      setDeviceInfo: (info) => set(info),
    }),
    {
      name: 'app-store',
    }
  )
)