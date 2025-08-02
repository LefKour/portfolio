'use client'

import WorkSection from "@/app/(containers)/WorkSection";
import HeroSection from "@/app/(containers)/HeroSection";
import AboutSection from "@/app/(containers)/AboutSection";
import ContactSection from "@/app/(containers)/ContactSection";
import GetInTouchWidget from "@/app/(components)/GetInTouchWidget";
import PhilosophySection from "@/app/(containers)/PhilosophySection";


export default function Home() {

      return (<>
          {/* Hero Section */}
          <HeroSection />

          {/* Philosophy */}
          <PhilosophySection />

          {/* About */}
          <AboutSection />

          {/* Work */}
          <WorkSection />

          {/* Contact */}
          <ContactSection />

          <GetInTouchWidget />
      </>);
}
