'use client'
import {useState, useEffect} from "react";
import PressureText from "@/app/(components)/PressureText";
import DotGrid from "@/app/(components)/DotGrid";

export default function Home() {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Responsive sizing
    useEffect(() => {
        window.addEventListener('resize', () =>
            setIsMobile(window.innerWidth < 640));
        return () => window.removeEventListener('resize', () =>
            setIsMobile(window.innerWidth < 640));
        }, []);

      return (<>

            {/*Hero Section*/}
            <div className='w-screen h-screen flex justify-center items-center m-0 p-0'>

                <DotGrid />

                <div className='flex-col items-center justify-center m-10 relative z-10'>
                    {/*Main Title*/}
                    <PressureText
                        text='Eleftherios Kourkopoulos'
                        flex={false}
                        alpha={false}
                        stroke={false}
                        width={true}
                        weight={true}
                        italic={true}
                        strokeColor={'#ffffff'}
                    />

                    <div className={`${(isMobile ? 'flex-col' : 'flex')} w-full justify-between items-center gap-6`}>
                        <h3>Software Developer</h3>
                        <div className='h-[1px] flex-grow bg-white rounded-full'/>
                        <p className={`italic ${(isMobile ? 'text-start':'text-end')}`}>working at the intersection of <br/> design and technology</p>
                    </div>

                    <div className={'w-[175px] h-[175px] bg-white'}></div>
                </div>
            </div>

          {/*Another Section*/}
        <div className='w-screen h-screen flex justify-center items-center'/>
  </>);
}
