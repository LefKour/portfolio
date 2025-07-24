'use client'
import {useState, useEffect} from "react";
import PressureText from "@/app/(components)/PressureText";

export default function Home() {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Responsive sizing
    useEffect(() => {
        const updateResponsiveSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 640);
        };

        window.addEventListener('resize', updateResponsiveSize);
        return () => window.removeEventListener('resize', updateResponsiveSize);
        }, []);



      return (<>

            {/*Hero Section*/}
            <div className='w-screen h-screen bg-linear-to-t from-black-500 to-orange-900 flex justify-center items-center'>
                <div className='flex-col items-center justify-center m-10'>

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
                        <p className={`italic ${(isMobile ? 'text-start':'text-end')}`}>bringing exceptional <br/> experiences to life</p>
                    </div>
                </div>
            </div>

        <div className='w-screen h-screen bg-white flex justify-center items-center'/>
  </>);
}
