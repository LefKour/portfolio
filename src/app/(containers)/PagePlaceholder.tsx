'use client'
import PressureText from "@/app/(components)/PressureText";
import { motion } from 'framer-motion';
import AnimatedGrid from "@/app/(components)/AnimatedGrid";

interface PagePlaceholderProps {
    pageTitle: string;
    titleSize: number;
};

const PagePlaceholder = ({pageTitle, titleSize}: PagePlaceholderProps) => {
    return (<>
        <section className='w-screen h-screen flex flex-col items-center justify-center'>
            <AnimatedGrid />

            <div className='h-full flex items-end justify-end'>

                <PressureText
                    text={pageTitle}
                    flex={false}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={true}
                    italic={true}
                    textSizeRem={titleSize}
                />
            </div>
            <div className='w-[95%] border border-[#666] z-1'/>
            <div className='w-full h-full flex justify-center items-center z-1 bg-black'>
                <div
                    className='absolute bottom-0 w-full h-[40%] bg-radial-[at_50%_100%] from-white from-0% to-black/5 opacity-20 to-75%'/>

                <div className='px-4 py-2 border border-white bg-black flex justify-center gap-6 max-w-[20rem]'>

                    {/* Ripple */}
                    <div className='relative top-[1rem]'>
                        <motion.div
                            className='w-2 h-2 bg-white rounded-full'
                        />
                        <motion.div
                            className='absolute inset-0 w-2 h-2 bg-white rounded-full'
                            animate={{
                                scale: [1, 2.5],
                                opacity: [0.6, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeOut"
                            }}
                        />
                        <motion.div
                            className='absolute inset-0 w-2 h-2 bg-white rounded-full'
                            animate={{
                                scale: [1, 2.5],
                                opacity: [0.4, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeOut",
                                delay: 0.5
                            }}
                        />
                        <motion.div
                            className='absolute inset-0 w-2 h-2 bg-white rounded-full'
                            animate={{
                                scale: [1, 2.5],
                                opacity: [0.2, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeOut",
                                delay: 1
                            }}
                        />
                    </div>

                    <p>This page is under development.<br/> Coming soon...</p>
                </div>
            </div>
        </section>
    </>);
};

export default PagePlaceholder;