import {useDeviceDetection} from "@/lib/hooks";

const HeroSection = () => {
    const { isMobile    } = useDeviceDetection();

    return (
        <section className='relative w-screen h-screen flex justify-center items-center m-0 p-0'>

            {/* Glow */}
            <div
                className='absolute bottom-0 w-full h-[40%] bg-radial-[at_50%_75%] from-white from-0% to-black/5 opacity-20 to-75%'/>

            <div className={`flex-col items-center justify-center relative z-10 ${(isMobile ? "gap-3" : "")}`}>
                {/*Main Title*/}
                <h1 className={`${(isMobile ? 'text-[1.75rem]' : 'text-[3rem]')} font-thin`}>Eleftherios
                    Kourkopoulos</h1>

                <div className={`flex ${isMobile ? 'flex-col gap-2' : 'gap-6'} w-full justify-between `}>
                    <div
                        className='bg-white/20 backdrop-blur-md border border-white px-2 py-1 flex items-center justify-center'>
                        <h3 className='text-[1.25rem]'>Software Developer</h3>
                    </div>

                    <div
                        className={`bg-white/20 backdrop-blur-md border border-white px-2 py-1  ${isMobile ? '' : 'max-w-[45%]'}`}>
                        <p className='text-[0.75rem]'>working at the intersection of design and technology</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

