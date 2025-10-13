'use client'
import {useDeviceDetection} from "@/lib/hooks";
import PlaceholderBackground from "@/app/(components)/PlaceholderBackground";
import ExperienceWindow from "@/app/(components)/ExperienceWindow";
import TestExperience from "@/lib/scenes/implemented scenes/TestExperience";
import StackExperience from "@/lib/scenes/implemented scenes/StackExperience";
import React from "react";

const Lab = () => {
    const {isMobile} = useDeviceDetection();


    return (<>
        <PlaceholderBackground />

        {/*<ExperienceWindow*/}
        {/*    ExperienceClass = {TestExperience}*/}
        {/*    initialWidth={window.innerWidth * 0.475}*/}
        {/*    initialHeight={window.innerHeight * 0.95}*/}
        {/*    initialX={window.innerWidth * 0.025 /2}*/}
        {/*    initialY={window.innerHeight * 0.05 /2}*/}
        {/*/>*/}

        {/*<ExperienceWindow*/}
        {/*    ExperienceClass = {StackExperience}*/}
        {/*    initialWidth={window.innerWidth * 0.475}*/}
        {/*    initialHeight={window.innerHeight * 0.95}*/}
        {/*    initialX={window.innerWidth * 0.5 + window.innerWidth * 0.025 /2}*/}
        {/*    initialY={window.innerHeight * 0.05 /2}*/}
        {/*/>*/}
    </>);
};

export default Lab;