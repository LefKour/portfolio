import React, {useCallback, useRef} from "react";
import {Project} from "../../utils/types.ts";
import {useGlobalContext} from "../../utils/context.tsx";

import '../PortfolioGridEntry/PortfolioGridEntry.scss';

const PortfolioGridEntry = (project:Project): JSX.Element => {
    const {setGlobalData} = useGlobalContext();

    const boundingRect = useRef<DOMRect | null>(null);

    const handleOnMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        boundingRect.current = event.currentTarget.getBoundingClientRect();

        setGlobalData({project});
    };

    const handleOnMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if (!boundingRect.current) return;

        const {clientX, clientY} = event;

        const centX = boundingRect.current.x + boundingRect.current.width / 2;
        const centY = boundingRect.current.y + boundingRect.current.height / 2;

        const xFactor = (centX - clientX) / boundingRect.current.width * 2;
        const yFactor = (centY - clientY) / boundingRect.current.height * 2;

        const xRotation = xFactor * 15; // 20 deg
        const yRotation = yFactor * 15; // 20 deg

        event.currentTarget.style.transform = `rotateY(${yRotation}deg) rotateX(${xRotation}deg)`;
    }, []);

    const handleOnMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        boundingRect.current = null;
        event.currentTarget.style.transform = `rotateX(${0}deg)`;

        setGlobalData({project: null});
    };

    const handleOnClick = () => {
        if(project?.url)
            window.open(project.url, '_blank');
    };

    return (
        <div className="portfolio-grid-entry__container"
             onMouseEnter={handleOnMouseEnter}
             onMouseMove={handleOnMouseMove}
             onMouseLeave={handleOnMouseLeave}
             onClick={handleOnClick}
        >

        <img src={project.imagePath} alt={project.title}/>
    </div>);
};

export default PortfolioGridEntry;