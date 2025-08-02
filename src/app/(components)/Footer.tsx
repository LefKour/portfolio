'use client'
import {useState, useEffect} from "react";

const Footer = () => {
    const [currentYear, setCurrentYear] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentYear(now.getFullYear().toString());
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
        <section className='flex w-full p-4 items-center justify-between '>
            <p>Crafted by Eleftherios Kourkopoulos, {currentYear}</p>
            <p>Copyright @ Eleftherios Kourkopoulos, All Rights Reserved</p>
        </section>
    );
};

export default Footer;