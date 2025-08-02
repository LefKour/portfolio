'use client'
import {useDeviceDetection} from "@/lib/hooks";
import PagePlaceholder from "@/app/(containers)/PagePlaceholder";

const Projects = () => {
    const {isMobile} = useDeviceDetection();

    return (<>
        <PagePlaceholder pageTitle={'Work'} titleSize={(isMobile ? 12: 24)} />
    </>);
};

export default Projects;