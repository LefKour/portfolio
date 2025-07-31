'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useDeviceDetection } from "@/lib/hooks";

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [elementDimensions, setElementDimensions] = useState({ width: 12, height: 12 })
  const { isMobile} = useDeviceDetection();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      const elementBelow = document.elementFromPoint(e.clientX, e.clientY)
      if (elementBelow) {
        const isInteractive = elementBelow.matches('button, a, [role="button"], .cursor-pointer, input, textarea, select') ||
                             elementBelow.closest('button, a, [role="button"], .cursor-pointer, input, textarea, select')
        
        const targetElement = isInteractive ? (elementBelow.matches('button, a, [role="button"], .cursor-pointer, input, textarea, select') ? elementBelow : elementBelow.closest('button, a, [role="button"], .cursor-pointer, input, textarea, select')) : null
        
        if (targetElement && !isHovering) {
          setIsHovering(true)
          const rect = targetElement.getBoundingClientRect()
          const padding = 8
          setElementDimensions({ 
            width: rect.width + padding, 
            height: rect.height + padding 
          })
          setCursorPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          })
        } else if (targetElement && isHovering) {
          const rect = targetElement.getBoundingClientRect()
          setCursorPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          })
        } else if (!targetElement && isHovering) {
          setIsHovering(false)
          setElementDimensions({ width: 12, height: 12 })
        }
        
        if (!targetElement) {
          setCursorPosition({ x: e.clientX, y: e.clientY })
        }
      }
    }

    document.addEventListener('mousemove', updateMousePosition)

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
    }
  }, [isHovering])



  return ( isMobile ?
          <></> :
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          width: elementDimensions.width,
          height: elementDimensions.height,
        }}
        style={{
          transform: 'translate(-50%, -50%)'
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 30,
          mass: 0.8,
        }}
      >
        <div className="relative w-full h-full">
          <motion.div
            className="absolute inset-0 bg-white"
            animate={{
              opacity: isHovering ? 0 : 1,
            }}
            transition={{
              duration: 0.15,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: isHovering ? 1 : 0,
            }}
            transition={{
              duration: 0.15,
              ease: "easeInOut"
            }}
          >
            <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-white" />
            <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-white" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-white" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-white" />
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}

export default Cursor