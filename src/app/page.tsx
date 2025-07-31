'use client'
import PressureText from "@/app/(components)/PressureText";
import { useDeviceDetection } from "@/lib/hooks/useDeviceDetection";

export default function Home() {

      return (<>
            {/*Hero Section*/}
            <div className='w-screen h-screen flex justify-center items-center m-0 p-0'>

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

                    <div className={`flex w-full justify-between items-center gap-6`}>
                        <h3>Software Developer</h3>
                        <div className='h-[1px] flex-grow bg-white rounded-full'/>
                        <p className={`italic text-end`}>working at the intersection of <br/> design and technology</p>
                    </div>

                </div>
            </div>

          {/*Another Section*/}
        <div className='w-screen h-screen flex justify-center items-center'/>
  </>);
}
