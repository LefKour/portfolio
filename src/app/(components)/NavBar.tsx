'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import { useDeviceDetection } from "@/lib/hooks";
import { useLoadingContext } from '@/lib/hooks/useLoadingContext';
import NavMenuItem from "@/app/(components)/NavMenuItem";
import PressureText from "@/app/(components)/PressureText";

const NavBar = () => {
    const router = useRouter();
    const { isMobile, isClient, screenWidth, screenHeight } = useDeviceDetection();
    const { isLoading } = useLoadingContext();

    // Cross Icon
    const [isCrossHovered, setIsCrossHovered] = useState(false);
    
    // Menu State
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuHovered, setIsMenuHovered] = useState(false);
    
    // Location and time
    const [location, setLocation] = useState<string>('');
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        if (isMobile && isMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [isMobile, isMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isMenuOpen) {
                const target = event.target as HTMLElement;
                const isMenuClick = target.closest('[data-menu-container]');
                const isMenuButtonClick = target.closest('[data-menu-button]');
                
                if (!isMenuClick && !isMenuButtonClick) {
                    setIsMenuOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);


    useEffect(() => {
        // TODO: Move to a config class
        const latitude = 51.5074;
        const longitude = -0.1278;

        const getLocationFromCoords = async () => {
            try {
                const response = await fetch(
                    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );
                const data = await response.json();
                
                const city = data.city || data.locality || 'Unknown';
                const country = data.countryCode || 'XX';
                
                setLocation(`${city.toUpperCase()}[${country}]`);
            } catch (error) {
                console.error('Error fetching location:', error);
                setLocation('UNKNOWN[XX]');
            }
        };

        getLocationFromCoords().then(r => {});
    }, []);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: false
            }).toLowerCase();
            setCurrentTime(timeString);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className={`fixed z-100 w-full flex gap-4 flex-col select-none`}
            initial={{ y: "-100%" }}
            animate={{ y: isLoading ? "-100%" : 0 }}
            exit={{ y: "-100%" }}
            transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
        >

            {/*Core Navbar*/}
            { !(isMobile && isMenuOpen) && <div
                className={`flex items-center justify-between relative w-full
                 backdrop-blur-md bg-linear-to-t from-black/5 to-white/5 p-4 overflow-clip
                 // ${screenWidth > 1220 ? 'max-w-[50%]' : ''} 
                 ${isMobile ? "pt-16 border-b" : "border w-full"} border-[#555] gap-8 select-none`}>

                {/*Header*/}
                <div className='flex items-center justify-center cursor-pointer gap-2 select-none'>
                    {/*Cross Icon*/}
                    {!isMobile && <motion.div
                        className='h-full w-[24px] mr-2 flex items-center justify-center relative p-4 cursor-pointer'
                        onHoverStart={() => setIsCrossHovered(true)}
                        onHoverEnd={() => setIsCrossHovered(false)}
                        animate={{rotate: isCrossHovered ? 45 : 0}}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                            duration: 0.3
                        }}
                    >
                        <motion.div
                            className='absolute w-[20px] h-[2px] bg-white'
                            animate={{
                                opacity: isCrossHovered ? 0.8 : 1
                            }}
                            transition={{duration: 0.2, ease: "easeInOut"}}
                        />
                        <motion.div
                            className='absolute w-[20px] h-[2px] bg-white rotate-90'
                            animate={{
                                opacity: isCrossHovered ? 0.8 : 1
                            }}
                            transition={{duration: 0.2, ease: "easeInOut"}}
                        />
                    </motion.div>}

                    {/*Name*/}
                    {isMobile ?
                        <h2 onClick={() => router?.push('/')}>ELEFTHERIOS KOURKOPOULOS</h2> :
                        <PressureText
                            text='Eleftherios Kourkopoulos'
                            flex={false}
                            alpha={false}
                            stroke={false}
                            width={true}
                            weight={true}
                            italic={true}
                            strokeColor={router ? '#ffffff' : '#ff0000'}
                            textSizeRem={1.5}
                            onClick={() => {
                                router?.push('/')
                            }}
                        />
                    }
                </div>

                {/*Menu Button*/}
                <motion.button
                    data-menu-button
                    className={`flex justify-center items-center gap-10 ${isMobile ? "p-3" : "px-5 py-3"} border`}
                    onHoverStart={() => setIsMenuHovered(true)}
                    onHoverEnd={() => setIsMenuHovered(false)}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    animate={{
                        backgroundColor:
                            isMobile ?
                                isMenuOpen ? 'rgba(255,255,255, 1)' : isMenuHovered ? 'rgba(30,30,30, 1)' : 'rgba(255,255,255, 0.2)' :
                                isMenuOpen ? 'rgba(255,255,255, 1)' : isMenuHovered ? 'rgba(30,30,30, 1)' : 'rgba(10,10,10,1)',
                    }}
                    transition={{duration: 0.2, ease: "easeInOut"}}
                >
                    {/* Menu Text */}
                    {!isMobile && <motion.span
                        className={`${isMenuOpen ? 'text-black' : 'text-white'} text-sm strong`}
                        animate={{
                            opacity: isMenuHovered ? 1 : 0.8,
                        }}
                        transition={{duration: 0.2}}
                    >
                        {isMenuOpen ? 'close' : 'menu'}
                    </motion.span>}

                    {/* Menu Icon */}
                    <motion.div
                        className='relative w-5 h-5 flex items-center justify-center'
                        animate={{rotate: isMenuOpen ? 180 : 0}}
                        transition={{duration: 0.3, ease: "easeInOut"}}
                    >
                        <motion.div
                            className={`absolute w-full h-0.5 ${isMenuOpen ? 'bg-black' : 'bg-white'}`}
                            animate={{
                                rotate: isMenuOpen ? 45 : 0,
                                y: isMenuOpen ? 0 : -6,
                            }}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                        />
                        <motion.div
                            className={`absolute w-full h-0.5 ${isMenuOpen ? 'bg-black' : 'bg-white'}`}
                            animate={{
                                opacity: isMenuOpen ? 0 : 1,
                                scaleX: isMenuOpen ? 0 : 1,
                            }}
                            transition={{duration: 0.2, ease: "easeInOut"}}
                        />
                        <motion.div
                            className={`absolute w-full h-0.5 ${isMenuOpen ? 'bg-black' : 'bg-white'}`}
                            animate={{
                                rotate: isMenuOpen ? -45 : 0,
                                y: isMenuOpen ? 0 : 6,
                            }}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                        />
                    </motion.div>
                </motion.button>
            </div>}

            {/* Indicator */}
            {isCrossHovered && !isMobile && (
                <motion.div
                    className='flex items-center gap-4 px-4 py-2 mx-4 border bg-black w-fit'
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                <div className='relative'>
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

                    <span className='text-white text-sm font-mono'>
                        {location && currentTime ? `${location}: ${currentTime}` : 'Loading location...'}
                    </span>
                    
                </motion.div>
            )}

            {/* Menu */}
            <motion.div
                data-menu-container
                className={`${isMobile ? 
                    "fixed inset-0 w-screen h-screen bg-linear-to-t from-black/20 to-white/10 backdrop-blur z-50" :
                    "flex flex-col gap-3 w-fit mx-4"
                }`}
                initial={{ opacity: 0, y: 0, height: 0 }}
                animate={{ 
                    opacity: isMenuOpen ? 1 : 0, 
                    y: isMenuOpen ? (isCrossHovered && !isMobile ? 1 : 0) : -20,
                    height: isMenuOpen ? 'auto' : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ 
                    overflow: 'hidden',
                    pointerEvents: isMenuOpen ? 'auto' : 'none'
                }}
            >
                {isMobile &&
                    <motion.button
                        data-menu-button
                        className={`absolute top-24 right-4 flex justify-center items-center gap-10 ${isMobile ? "p-3" : "px-5 py-3"} border`}
                        onHoverStart={() => setIsMenuHovered(true)}
                        onHoverEnd={() => setIsMenuHovered(false)}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        animate={{
                            backgroundColor:
                                isMobile ?
                                    isMenuOpen ? 'rgba(255,255,255, 1)' : isMenuHovered ? 'rgba(30,30,30, 1)' : 'rgba(255,255,255, 0.2)' :
                                    isMenuOpen ? 'rgba(255,255,255, 1)' : isMenuHovered ? 'rgba(30,30,30, 1)' : 'rgba(10,10,10,1)',
                        }}
                        transition={{duration: 0.2, ease: "easeInOut"}}
                    >
                        {/* Menu Text */}
                        {!isMobile && <motion.span
                            className={`${isMenuOpen ? 'text-black' : 'text-white'} text-sm strong`}
                            animate={{
                                opacity: isMenuHovered ? 1 : 0.8,
                            }}
                            transition={{duration: 0.2}}
                        >
                            {isMenuOpen ? 'close' : 'menu'}
                        </motion.span>}

                        {/* Menu Icon */}
                        <motion.div
                            className='relative w-5 h-5 flex items-center justify-center'
                            animate={{rotate: isMenuOpen ? 180 : 0}}
                            transition={{duration: 0.3,
                                ease: "easeInOut"}}
                        >
                            <motion.div
                                className={`absolute w-full h-0.5 ${isMenuOpen ? 'bg-black' : 'bg-white'}`}
                                animate={{
                                    rotate: isMenuOpen ? 45 : 0,
                                    y: isMenuOpen ? 0 : -6,
                                }}
                                transition={{duration: 0.3, ease: "easeInOut"}}
                            />
                            <motion.div
                                className={`absolute w-full h-0.5 ${isMenuOpen ? 'bg-black' : 'bg-white'}`}
                                animate={{
                                    opacity: isMenuOpen ? 0 : 1,
                                    scaleX: isMenuOpen ? 0 : 1,
                                }}
                                transition={{duration: 0.2, ease: "easeInOut"}}
                            />
                            <motion.div
                                className={`absolute w-full h-0.5 ${isMenuOpen ? 'bg-black' : 'bg-white'}`}
                                animate={{
                                    rotate: isMenuOpen ? -45 : 0,
                                    y: isMenuOpen ? 0 : 6,
                                }}
                                transition={{duration: 0.3, ease: "easeInOut"}}
                            />
                        </motion.div>
                    </motion.button>
                }

                <motion.div className=
                                {`${isMobile ?
                                    "w-screen h-screen flex flex-col items-center justify-center gap-2" :
                                    "grid grid-cols-2 gap-4"
                                }`}
                >
                    {[
                        {name: 'about.', path: '/about'},
                        {name: 'work.', path: '/work'},
                        {name: 'lab', path: '/lab'},
                        {name: 'contact', path: '/contact'}
                    ].map((item, index) => (
                        <NavMenuItem
                            key={item.name}
                            name={item.name}
                            path={item.path}
                            index={index}
                            isMenuOpen={isMenuOpen}
                            onClose={() => setIsMenuOpen(false)}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default NavBar;