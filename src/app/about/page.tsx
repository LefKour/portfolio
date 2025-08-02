'use client'
import {useDeviceDetection} from "@/lib/hooks";
import PagePlaceholder from "@/app/(containers)/PagePlaceholder";

const About = () => {
    const {isMobile} = useDeviceDetection();

    return (<>
        <PagePlaceholder pageTitle={'About'} titleSize={(isMobile ? 10: 24)} />
    </>);
};

export default About;