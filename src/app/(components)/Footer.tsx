'use client'
import {useState, useEffect} from "react";

const Footer = () => {
    const [currentYear, setCurrentYear] = useState<string>('');

    useEffect(() => {
        const now = new Date();
        setCurrentYear(now.getFullYear().toString());
    }, []);

    return (
        <section className='absolute bottom-0 w-full flex p-4 justify-between'>
            <p className={"margin-auto"}>Crafted by Eleftherios Kourkopoulos, {currentYear}</p>
            <p className={"margin-auto"}>Copyright @ Eleftherios Kourkopoulos, All Rights Reserved</p>
        </section>
    );
};

export default Footer;