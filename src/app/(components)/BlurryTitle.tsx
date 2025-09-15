'use client';

import { motion, Variants } from 'framer-motion';
import { useLoadingContext } from '@/lib/hooks/useLoadingContext';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {useDeviceDetection} from "@/lib/hooks";

interface BlurryTitleProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function BlurryTitle({ 
  text, 
  className = '', 
  delay = 0.3,
  stagger = 0.05 
}: BlurryTitleProps) {
  const { isLoading } = useLoadingContext();
  const { isMobile } = useDeviceDetection();
  const letters = useMemo(() => {
    if (isMobile) {
      return text.replace(/ /g, '\n').split('');
    }
    return text.split('');
  }, [text, isMobile]);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [letterBlurs, setLetterBlurs] = useState<number[]>(new Array(letters.length).fill(0));
  const [isHovered, setIsHovered] = useState(false);
  const [rotationValues, setRotationValues] = useState({ rotateX: 0, rotateY: 0 });

  const randomDelays = useMemo(() => letters.map(() => Math.random() * 1.5 + delay), [letters.length, delay]);
  const randomDurations = useMemo(() => letters.map(() => Math.random() * 0.8 + 0.4), [letters.length]);

  const calculateDistance = useCallback((letterIndex: number) => {
    const letterElement = letterRefs.current[letterIndex];
    if (!letterElement) return Infinity;
    
    const rect = letterElement.getBoundingClientRect();
    const letterCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    
    const dx = mousePosition.x - letterCenter.x;
    const dy = mousePosition.y - letterCenter.y;
    return Math.sqrt(dx * dx + dy * dy);
  }, [mousePosition]);

  useEffect(() => {
    if (!isLoading && isHovered && !isMobile) {
        const newBlurs = letters.map((_, index) => {
            const distance = calculateDistance(index);
            const focusDistance = 100;
            const maxBlur = 6;

            return distance < focusDistance ? 0 : Math.min(((distance - focusDistance) / 100) * maxBlur, maxBlur);
        });

        setLetterBlurs(newBlurs);
    }
    else {
        setLetterBlurs(new Array(letters.length).fill(0));
    }
  }, [mousePosition, letters.length, isLoading, isHovered]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const createLetterVariants = useCallback((randomDelay: number, randomDuration: number): Variants => ({
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: randomDuration,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        delay: randomDelay,
      },
    },
  }), []);

  return (
    <div 
      ref={containerRef}
      className={`inline-block ${className} transition-transform duration-200 ease-out`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `perspective(1000px) rotateX(${rotationValues.rotateX}deg) rotateY(${rotationValues.rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          ref={(el: HTMLSpanElement | null) => {
            letterRefs.current[index] = el;
          }}
          variants={createLetterVariants(randomDelays[index], randomDurations[index])}
          initial="hidden"
          animate={!isLoading ? "visible" : "hidden"}
          className={`inline-block ${isMobile ? 'text-[3rem]' : 'text-[5rem]'} transition-all duration-150 ease-out`}
          style={{ 
            whiteSpace: letter === ' ' || letter === '\n' ? 'pre' : 'normal',
            filter: !isLoading ? `blur(${letterBlurs[index] || 0}px)` : 'blur(8px)',
            display: letter === '\n' ? 'block' : 'inline-block',
            width: letter === '\n' ? '100%' : 'auto',
            height: letter === '\n' ? '0' : 'auto'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter === '\n' ? '' : letter}
        </motion.span>
      ))}
    </div>
  );
}