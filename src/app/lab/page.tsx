'use client'
import PagePlaceholder from "@/app/(containers)/PagePlaceholder";
import {useDeviceDetection} from "@/lib/hooks";

const Lab = () => {
    const {isMobile} = useDeviceDetection();


    return (<>
        <PagePlaceholder pageTitle={'Lab'} titleSize={(isMobile ? 18: 24)} />
    </>);
};

export default Lab;