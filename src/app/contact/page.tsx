'use client'
import {useDeviceDetection} from "@/lib/hooks";
import PlaceholderBackground from "@/app/(components)/PlaceholderBackground";

const Contact = () => {
    const {isMobile} = useDeviceDetection();

    return (<>
        <PlaceholderBackground />
    </>);
};

export default Contact;