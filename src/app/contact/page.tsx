'use client'
import {useDeviceDetection} from "@/lib/hooks";
import PagePlaceholder from "@/app/(containers)/PagePlaceholder";

const Contact = () => {
    const {isMobile} = useDeviceDetection();

    return (<>
        <PagePlaceholder pageTitle={'Contact'} titleSize={(isMobile ? 8: 16)} />
    </>);
};

export default Contact;