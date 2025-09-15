'use client'

import WorkSection from "@/app/(containers)/WorkSection";
import HeroSection from "@/app/(containers)/HeroSection";
import AboutSection from "@/app/(containers)/AboutSection";
import ContactSection from "@/app/(containers)/ContactSection";
import GetInTouchWidget from "@/app/(components)/GetInTouchWidget";
import PhilosophySection from "@/app/(containers)/PhilosophySection";
import LoadingScreen from "@/app/(components)/LoadingScreen";
import { useLoadingContext } from "@/lib/hooks/useLoadingContext";
import Cursor from "@/app/(components)/Cursor";

export default function Home() {
    const { isLoading, completeLoading } = useLoadingContext();

    return (<>
        {/* Main Page Content */}
        <HeroSection />
        {/*<PhilosophySection />*/}
        {/*<AboutSection />*/}
        {/*<WorkSection />*/}
        {/*<ContactSection />*/}
        {/*<GetInTouchWidget />*/}
        {/*<Cursor />*/}

        {/*/!* Loading Screen Overlay *!/*/}
        {/*{isLoading && <LoadingScreen onComplete={completeLoading} />}*/}
    </>);
}
