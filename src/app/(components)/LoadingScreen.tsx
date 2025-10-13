'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    //TODO: Proper loading logic (or not)
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsExiting(true);
            setTimeout(onComplete, 1500);
            return 100;
          }

          const increment = Math.random() * 8 + 2;
          return Math.min(prev + increment, 100);
        });
      }, 300);
    }, 1200);

    return () => clearTimeout(startDelay);
  }, [onComplete]);

  return (
    <motion.div 
      className="w-screen font-space-grotesk fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]
      stroke-1 stroke-white"
      initial={{ height: "100vh" }}
      animate={isExiting ? { 
        height: "1px",
        top: "50%",
        transform: "translateY(-50%)"
      } : { height: "100vh" }}
      transition={isExiting ? {
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.3
      } : {}}
      style={{ overflow: "hidden" }}
    >
      <div className="w-full p-10 flex flex-col items-start space-y-3">
        <div className="overflow-hidden">
          <motion.div 
            className="text-4xl font-light text-[var(--foreground)]"
            initial={{ y: "100%" }}
            animate={isExiting ? { y: "-100%" } : { y: 0 }}
            transition={isExiting ? { 
              duration: 0.4,
              ease: [0.55, 0.06, 0.68, 0.19]
            } : { 
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            Eleftherios Kourkopoulos
          </motion.div>
        </div>
        
        <motion.div 
          className="w-full h-[1px] bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
          transition={isExiting ? {
            duration: 0.3,
            ease: "easeOut"
          } : { 
            duration: 0.6, 
            delay: 0.8,
            ease: "easeOut"
          }}
        >
          <div 
            className="h-full bg-[var(--foreground)] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </motion.div>
        
        <motion.div 
          className="self-end text-sm text-[var(--foreground)] font-medium"
          initial={{ opacity: 0 }}
          animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
          transition={isExiting ? {
            duration: 0.3,
            ease: "easeOut"
          } : { 
            duration: 0.6, 
            delay: 1.0,
            ease: "easeOut"
          }}
        >
          {Math.round(progress)}%
        </motion.div>
      </div>
    </motion.div>
  );
}