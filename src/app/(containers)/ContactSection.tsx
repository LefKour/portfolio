import React from "react";
import { useDeviceDetection } from "@/lib/hooks";
import { useLoadingContext } from "@/lib/hooks/useLoadingContext";

const ContactSection = () => {
    const { isMobile } = useDeviceDetection();
    const { isLoading } = useLoadingContext();

    return (
        <section data-tag={"contact-section"}
                 className='mb-45 flex flex-col gap-4'>
            <h3 className={"text-2xl"}>Contact</h3>
            <div className={"flex flex-col gap-2"}>
                <p className={"font-light text-neutral-300"}>
                    I am always interested in connecting with individuals, organizations and institutions.
                    If you have an interesting project in mind, a question to ask, feedback to share or an exciting
                    opportunity to connect and explore, let’s get in touch!
                </p>

                <p className={"font-light text-neutral-300"}>
                    Feel free to send me an
                    <span className={"font-bold cursor-pointer hover:text-blue-500"}
                          onClick={() => { window.location.href = "mailto:lefterkour@hotmail.com"
                          }}> e-mail </span>
                    or contact me via social media.
                </p>
            </div>
        </section>
    );
};

export default ContactSection;

