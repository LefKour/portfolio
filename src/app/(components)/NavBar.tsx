'use client'
import { motion } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from "react";
import Link from "next/link";
import {Github, Linkedin} from "lucide-react";

interface NavBarItemProps {
    name: string,
    route: string
}

const NavBarItem = ({
                        name,
                        route
                    }: NavBarItemProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const hoveredColor = "#DE9C40";

    return (
    <li className={'inline-flex gap-2 items-center px-2 py-1 bg-white/20 border rounded-lg ' +
        'hover:bg-white/50 transition ease-in-out duration-100'}
        onMouseEnter={() => {setIsHovered(true)}}
        onMouseLeave={() => {setIsHovered(false)}}
    >
        <Link href={route} className={`${isHovered ? `font-bold` : "text-white"} transition`}>{name}</Link>
    </li>);
};

const NavBar = () => {
    const router = useRouter();
    const path = usePathname();

    const handleContactClick = () => {
        if (path !== '/') {
            sessionStorage.setItem('scrollToContact', 'true');
            router.push('/');
        } else {
            const contactSection = document.querySelector('[data-tag="contact-section"]');
            contactSection?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Check if we need to scroll after navigation
    useEffect(() => {
        if (path === '/' && sessionStorage.getItem('scrollToContact') === 'true') {
            sessionStorage.removeItem('scrollToContact');

            setTimeout(() => {
                const contactSection = document.querySelector('[data-tag="contact-section"]');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }, [path]);

    return (
        <motion.div
            className={`fixed top-0 flex flex-col gap-10 p-4 pt-10 pb-10 justify-center select-none z-50`}
        >

            {/* Header */}
            <div className={"flex flex-col max-w-82"}>
                <h2 className={"font-medium text-2xl"}>Eleftherios Kourkopoulos</h2>
                <p className={"font-light"}>software developer | creative technologist</p>
            </div>

            {/* Navigation */}
            <ul className={"flex flex-col max-w-82 gap-2 items-start"}>
                <NavBarItem name={"Home"} route={"/"} />
                <NavBarItem name={"About"} route={"/about"} />
                <NavBarItem name={"Work"} route={"/work"} />
                <li className={'inline-flex gap-2 items-center px-2 py-1 bg-white/20 border rounded-lg ' +
                    'hover:bg-white/50 transition ease-in-out duration-100 cursor-pointer'}
                    onClick={handleContactClick}
                >
                    <span className={"hover:font-bold transition"}>Contact</span>
                </li>
            </ul>

            {/*Social Media Buttons*/}
            <div className={"flex gap-2 items-center"}>
                <button className={"border p-2 rounded-full cursor-pointer hover:bg-white/20 transition"}
                        onClick={() => window.open("https://github.com/LefKour")}
                >
                    <Github/>
                </button>
                <button className={"border p-2 rounded-full cursor-pointer hover:bg-white/20 transition"}
                        onClick={() => window.open("https://www.linkedin.com/in/eleftherios-kourkopoulos-b27b32b8/")}
                >
                    <Linkedin/>
                </button>
            </div>
        </motion.div>
    );
}

export default NavBar;