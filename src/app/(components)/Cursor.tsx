'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDeviceDetection } from "@/lib/hooks";

// interface Ripple {
//   id: string;
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [elementDimensions, setElementDimensions] = useState({ width: 12, height: 12 });
  // const [ripples, setRipples] = useState<Ripple[]>([]);
  const { isMobile} = useDeviceDetection();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
      if (elementBelow) {
        const isInteractive = elementBelow.matches('button, a, [role="button"], .cursor-pointer, input, textarea, select') ||
                             elementBelow.closest('button, a, [role="button"], .cursor-pointer, input, textarea, select');
        
        const targetElement = isInteractive ? (elementBelow.matches('button, a, [role="button"], .cursor-pointer, input, textarea, select') ?
            elementBelow : elementBelow.closest('button, a, [role="button"], ' +
                '.cursor-pointer, input, textarea, select')) : null;
        
        if (targetElement && !isHovering) {
          setIsHovering(true);
          const rect = targetElement.getBoundingClientRect();
          const padding: number = 8;
          setElementDimensions({ 
            width: rect.width + padding, 
            height: rect.height + padding 
          });
          setCursorPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          });
        } else if (targetElement && isHovering) {
          const rect = targetElement.getBoundingClientRect()
          setCursorPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          });
        } else if (!targetElement && isHovering) {
          setIsHovering(false);
          setElementDimensions({ width: 12, height: 12 });
        }
        
        if (!targetElement) {
          setCursorPosition({ x: e.clientX, y: e.clientY });
        }
      }
    }

    // const handleClick = (e: MouseEvent) => {
    //   const newRipple: Ripple = {
    //     id: Date.now().toString() + Math.random(),
    //     x: cursorPosition.x,
    //     y: cursorPosition.y,
    //     width: elementDimensions.width,
    //     height: elementDimensions.height
    //   }
    //
    //   setRipples(prev => [...prev, newRipple]);
    //
    //   setTimeout(() => {
    //     setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    //   }, 500);
    // }

    document.addEventListener('mousemove', updateMousePosition);
    // document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      // document.removeEventListener('click', handleClick);
    };
  }, [isHovering]);

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
      
      {/*<AnimatePresence>*/}
      {/*  {ripples.map((ripple) => (*/}
      {/*    <motion.div*/}
      {/*      key={ripple.id}*/}
      {/*      className="fixed pointer-events-none z-[9998] border-2 border-white"*/}
      {/*      initial={{*/}
      {/*        left: ripple.x,*/}
      {/*        top: ripple.y,*/}
      {/*        width: ripple.width,*/}
      {/*        height: ripple.height,*/}
      {/*        opacity: 0.8,*/}
      {/*      }}*/}
      {/*      animate={{*/}
      {/*        width: ripple.width * 3,*/}
      {/*        height: ripple.height * 3,*/}
      {/*        opacity: 0,*/}
      {/*      }}*/}
      {/*      exit={{*/}
      {/*        opacity: 0,*/}
      {/*      }}*/}
      {/*      style={{*/}
      {/*        transform: 'translate(-50%, -50%)',*/}
      {/*      }}*/}
      {/*      transition={{*/}
      {/*        duration: 0.5,*/}
      {/*        ease: "easeOut"*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</AnimatePresence>*/}
    </>
  )
}

export default Cursor