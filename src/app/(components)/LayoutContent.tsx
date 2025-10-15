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
    <main className={"relative w-full max-w-[1200px] mx-auto min-h-screen"}>
        <div className={"relative flex flex-col md:flex-row w-full gap-2"}>

            {/* NavBar */}
            <div className={"w-1/3"}>
                <NavBar/>
            </div>

            {/* Content */}
            <div className={"w-full md:w-2/3 px-5"}>
                {children}
            </div>
        </div>
        <Footer/>
    </main>
  );
}