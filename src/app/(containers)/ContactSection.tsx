import React from "react";
import { useDeviceDetection } from "@/lib/hooks";
import { useLoadingContext } from "@/lib/hooks/useLoadingContext";


const ContactSection = () => {
    const { isMobile } = useDeviceDetection();
    const { isLoading } = useLoadingContext();

    return (
        <section data-tag={"contact-section"}
                 className='relative w-screen h-screen flex justify-center items-center m-0 p-0 bg-black'>
            Contact
        </section>
    );
};

export default ContactSection;

