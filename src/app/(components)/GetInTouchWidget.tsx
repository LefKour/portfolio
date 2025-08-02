'use client'
import React, { useState, useEffect } from 'react';

interface GetInTouchWidgetProps {
}

const GetInTouchWidget = ({
                          }: GetInTouchWidgetProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div className="fixed flex items-center justify-center p-2 gap-3 bottom-[1rem] right-[1rem]
        border border-white backdrop-blur-md bg-linear-to-t from-black/5 to-white/20 transition duration-500
        hover:from-black/5 hover:to-white/5"
             onClick={() => window.scrollTo(0, document.body.scrollHeight)}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
        >
            <div className="h-[48px] w-[48px] bg-black"/>
            <p className="text-white text-[1.2rem]">get in touch.</p>
            {isHovered &&
                <div className='fill-white scale-[150%]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/>
                    </svg>
                </div>
            }
        </div>
    );
};

export default GetInTouchWidget;