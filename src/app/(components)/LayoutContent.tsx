'use client';

import { useEffect } from 'react';
import { useLoadingContext } from '@/lib/hooks/useLoadingContext';
import NavBar from './NavBar';
import Footer from './Footer';

interface LayoutContentProps {
  children: React.ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const { isLoading } = useLoadingContext();

  useEffect(() => {
    if (isLoading) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isLoading]);

  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}