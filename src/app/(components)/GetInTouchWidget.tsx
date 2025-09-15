'use client'
import React, { useState, useEffect } from 'react';
import {useDeviceDetection, useLoadingContext} from "@/lib/hooks";
import {motion} from 'framer-motion';

interface GetInTouchWidgetProps {
}

const GetInTouchWidget = ({
                          }: GetInTouchWidgetProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const {isMobile} = useDeviceDetection();
    const { isLoading } = useLoadingContext();

    return (
        <motion.div
            data-cursor-target
            className={`fixed flex items-center justify-center ${isMobile ? 'p-1 m-4' : 'p-2'} gap-3 bottom-0 right-0
        border border-white backdrop-blur-md bg-linear-to-t from-black/5 to-white/20 transition duration-500
        hover:from-black/5 hover:to-white/5`}
            onClick={() => window.scrollTo(0, document.body.scrollHeight)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ y: "150%" }}
            animate={{ y: isLoading ? "150%" : 0 }}
            transition={{
                duration: 2,
                delay: 0,
                ease: 'easeIn'
            }}
        >
            {/*//TODO: Update with image*/}
            <div className={`${isMobile ? 'h-[32px] w-[32px]' : 'h-[48px] w-[48px]'} bg-black`}/>
            <p className={`text-white ${isMobile ? 'text-[1rem]' : 'text-[1.2rem]'} `}>get in touch.</p>
            {
                !isMobile &&
                <div
                    className='fill-white scale-[150%] transition-opacity duration-300'
                    style={{opacity: isHovered ? 1 : 0}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/>
                    </svg>
                </div>
            }
        </motion.div>
    );
};

export default GetInTouchWidget;