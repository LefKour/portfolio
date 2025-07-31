'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useDeviceDetection } from "@/lib/hooks";

interface MenuItemProps {
  name: string
  path: string
  index: number
  isMenuOpen: boolean
  onClose: () => void
}

const MenuItem = ({ name, path, index, isMenuOpen, onClose }: MenuItemProps) => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile } = useDeviceDetection();

  const handleClick = () => {
    router?.push(path)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: isMenuOpen ? 1 : 0,
        x: isMenuOpen ? 0 : -20,
      }}
      transition={{
        duration: 0.3,
        delay: isMenuOpen ? index * 0.1 : 0,
        ease: "easeInOut"
      }}
      className={`${ isMobile ? "w-[180px] h-[180px]" : "w-[250px] h-[250px]"} border flex px-4 py-2 items-end backdrop-blur-md border-[#555] cursor-pointer relative overflow-hidden`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ 
        scale: 1.00,
        borderColor: '#888',
      }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: isHovered 
          ? 'linear-gradient(to top, rgba(0,0,0,0.2), rgba(255,255,255,0.15))'
          : 'linear-gradient(to top, rgba(0,0,0,0.05), rgba(255,255,255,0.05))'
      }}
    >
      <div className='flex gap-2 justify-start items-center'>
        {isHovered && (
          <motion.div
            className='w-[10px] h-[10px] bg-white'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
        )}
        <motion.p
          animate={{
            x: isHovered ? (isHovered ? 4 : 0) : 0,
            color: isHovered ? '#ffffff' : '#cccccc'
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {name}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default MenuItem