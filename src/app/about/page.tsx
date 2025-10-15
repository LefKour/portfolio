'use client'
import {useDeviceDetection} from "@/lib/hooks";
import HighlightSpan from "@/app/(components)/HighlighSpan";
import Bio from "@/app/about/Bio";
import WorkExperience from "@/app/about/WorkExperience";
import Publications from "@/app/about/Publications";
import Talks from "@/app/about/Talks";
import Education from "@/app/about/Education";

const About = () => {
    const {isMobile} = useDeviceDetection();

    return (
        <div className={"flex flex-col gap-35"}>

            {/* Banner */}
            <div className="flex flex-col gap-4 items-start">
                <section data-tag={"hero-section"}
                         className='relative flex flex-col items-center p-0 mt-35 text-wrap '>
                    <p className={"w-full text-3xl font-medium text-neutral-400"}>
                        I'm a software <HighlightSpan>software developer</HighlightSpan>,
                        <HighlightSpan> researcher</HighlightSpan> and
                        <HighlightSpan> lecturer </HighlightSpan>
                        exploring the intersection of
                        <HighlightSpan> computer graphics for immersive media </HighlightSpan>,
                        <HighlightSpan> fullstack web development </HighlightSpan> and
                        <HighlightSpan> data-intensive applications </HighlightSpan>.
                    </p>
                </section>
            </div>

            {/* Bio */}
            <Bio />

            {/* Work Experience */}
            <WorkExperience />

            {/* Publications */}
            <Publications />

            {/* Talks */}
            <Talks />

            {/* Education */}
            <Education />
        </div>);
};

export default About;