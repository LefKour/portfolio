'use client';
import { useLoadingContext } from '@/lib/hooks/useLoadingContext';
import NavBar from './NavBar';
import Footer from './Footer';

interface LayoutContentProps {
  children: React.ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const { isLoading } = useLoadingContext();

  return (
    <main className={"relative max-w-[1000px] mx-auto min-h-screen"}>
        <div className={"relative flex w-full gap-2"}>
            <div className={"w-1/3"}>
                <NavBar/>
            </div>
            <div className={"w-2/3"}>
                {children}
            </div>
        </div>
        <Footer/>
    </main>
  );
}