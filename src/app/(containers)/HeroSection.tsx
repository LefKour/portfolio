import { useDeviceDetection } from "@/lib/hooks";
import { useLoadingContext } from "@/lib/hooks/useLoadingContext";
import { motion } from "framer-motion";
import AnimatedGrid from "@/app/(components)/AnimatedGrid";
import BlurryTitle from "@/app/(components)/BlurryTitle";
import BackgroundGrid from "@/app/(components)/BackgroundGrid";

const HeroSection = () => {
    const { isMobile } = useDeviceDetection();
    const { isLoading } = useLoadingContext();

    return (
        <section className='relative w-screen h-screen flex justify-center items-center m-0 p-0'>

            {/*Background*/}
            {/*<AnimatedGrid />*/}
            <BackgroundGrid />

            <div className="fixed top-2 left-2 flex flex-col gap-2">
                <div className="w-[350px] h-[350px] bg-black flex flex-col p-6 gap-5">
                    <h1 className="text-[2rem] font-bold text-base/8">Eleftherios Kourkopoulos</h1>
                    <div className="w-full h-[1px] bg-white"/>
                    <p>
                        I am software developer working at the intersection of technology and design, with a creative
                        twist.
                        From XR development to investigating novel applications of technology with data-driven.
                    </p>
                </div>

                <div className="bg-black flex p-2 gap-5 bg-white/25 rounded-md backdrop-blur-lg">
                    <div className="w-[100px] h-[100px] bg-black"/>
                    <h2 className="text-black text-xl">Contact</h2>
                </div>

                <div className="bg-black flex justify-between p-2 gap-5 bg-white/25 rounded rounded-md backdrop-blur-lg">
                    <h2 className="text-black text-xl">Controls</h2>
                </div>

                <div className="bg-black flex flex-col p-2 gap-5 bg-white/25 rounded rounded-md backdrop-blur-lg">
                    <h2 className="text-black text-xl">menu</h2>
                    <div className="flex flex-col gap-2 text-black text-start">
                        <button>home</button>
                        <button>about</button>
                        <button>works</button>
                        <button>contact</button>
                    </div>
                </div>

            </div>

            {/* Glow */}
            {/*    <div*/}
            {/*        className='absolute bottom-0 w-full h-[40%] bg-radial-[at_50%_75%]*/}
            {/*        from-white from-0% to-black/5 opacity-20 to-75%'/>*/}

        {/*    <div className={`flex-col m-10 items-center justify-center relative z-10 ${(isMobile ? "gap-3" : "")}`}>*/}
        {/*        /!*Main Title*!/*/}
        {/*        <BlurryTitle*/}
        {/*            text={'Eleftherios Kourkopoulos'}*/}
        {/*        />*/}

        {/*        <div className={`flex ${isMobile ? 'flex-col gap-2' : 'gap-6'} w-full justify-between overflow-hidden`}>*/}
        {/*            <motion.div*/}
        {/*                data-cursor-target*/}
        {/*                className='bg-white/20 backdrop-blur-md border border-white px-2 py-1 flex items-center justify-center'*/}
        {/*                initial={{*/}
        {/*                    opacity: 0,*/}
        {/*                    y: 40,*/}
        {/*                    filter: 'blur(4px)'*/}
        {/*                }}*/}
        {/*                animate={!isLoading ? {*/}
        {/*                    opacity: 1,*/}
        {/*                    y: 0,*/}
        {/*                    filter: 'blur(0px)'*/}
        {/*                } : {*/}
        {/*                    opacity: 0,*/}
        {/*                    y: 20,*/}
        {/*                    filter: 'blur(4px)'*/}
        {/*                }}*/}
        {/*                transition={{ */}
        {/*                    duration: 0.8,*/}
        {/*                    ease: [0.25, 0.46, 0.45, 0.94],*/}
        {/*                    delay: 1.5*/}
        {/*                }}*/}
        {/*            >*/}
        {/*                <h3 className='text-[1.25rem]'>Creative Software Developer</h3>*/}
        {/*            </motion.div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        </section>
    );
};

export default HeroSection;

