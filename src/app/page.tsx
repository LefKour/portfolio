'use client'

import HeroSection from "@/app/(containers)/HeroSection";
import ExpertiseSection from "@/app/(containers)/ExpertiseSection";
import EngagementSection from "@/app/(containers)/EngagementSection";
import WorkSection from "@/app/(containers)/WorkSection";
import ContactSection from "@/app/(containers)/ContactSection";

export default function Home() {

    return (
        // Main Page Content
        <div className={"flex flex-col gap-35"}>
            <HeroSection />
            <ExpertiseSection />
            <EngagementSection />
            <WorkSection />
            <ContactSection />
        </div>
    );
}
