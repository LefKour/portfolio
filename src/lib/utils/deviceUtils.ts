export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
} as const

export const getDeviceFeatures = (deviceType: 'mobile' | 'tablet' | 'desktop', orientation: 'portrait' | 'landscape') => {
  return {
    showFullNav: deviceType === 'desktop',
    showHamburgerMenu: deviceType === 'mobile' || deviceType === 'tablet',
    enableAnimations: deviceType === 'desktop' || (deviceType === 'tablet' && orientation === 'landscape'),
    showSidebar: deviceType === 'desktop' && orientation === 'landscape',
    gridColumns: deviceType === 'mobile' ? 1 : deviceType === 'tablet' ? 2 : 3,
    cardSize: deviceType === 'mobile' ? 'small' : deviceType === 'tablet' ? 'medium' : 'large',
  }
}