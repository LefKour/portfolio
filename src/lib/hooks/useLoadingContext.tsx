'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  completeLoading: () => void;
}

const UseLoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('portfolio-loaded');
    
    if (hasLoaded) {
      setIsLoading(false);
    }
  }, []);

  const completeLoading = () => {
    setIsLoading(false);
    sessionStorage.setItem('portfolio-loaded', 'true');
  };

  return (
    <UseLoadingContext.Provider value={{ isLoading, completeLoading }}>
      {children}
    </UseLoadingContext.Provider>
  );
}

export function useLoadingContext() {
  const context = useContext(UseLoadingContext);
  if (context === undefined) {
    throw new Error('  must be used within a LoadingProvider');
  }
  return context;
}