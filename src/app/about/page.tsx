'use client'
import {useDeviceDetection} from "@/lib/hooks";
import PlaceholderBackground from "@/app/(components)/PlaceholderBackground";

const About = () => {
    const {isMobile} = useDeviceDetection();

    return (<>
        <PlaceholderBackground />
    </>);
};

export default About;