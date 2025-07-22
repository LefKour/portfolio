import Head from "next/head";

import NavBar from '@/components/NavBar';

export default function Home() {
  return (<>
    {/*Head*/}
    <Head>
        <title>Eleftherios Kourkopoulos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </Head>

    {/*NavBar*/}
    <NavBar/>

    <div className='w-screen h-screen flex justify-center items-center'>
        <div className='flex-col items-center justify-center'>
            <h1 className='text-[4rem]'>Eleftherios Kourkopoulos</h1>
            <div className='flex w-full justify-between items-center gap-5 '>
                <h3>Software Developer</h3>
                <div className='h-[1px] flex-grow bg-white rounded-full' />
                <p className='italic text-end'>bringing exceptional <br /> experiences to life</p>
            </div>
        </div>
    </div>

  </>);
}
