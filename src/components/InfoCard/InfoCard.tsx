import './InfoCard.scss';
import {Project, ProjectType} from "../../utils/types.ts";
import {useEffect, useRef} from "react";

interface InfoCardProps {
    project: Project | null,
}
 const InfoCard = ({project}: InfoCardProps) => {

    // HTML Element Refs
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // State Refs
     const isSetup = useRef(false);

    const handleOnMouseClick  = ():void => {
        if(project?.url)
            window.open(project.url);
    };

    const getProjectTypeText = (): string => {
        switch (project?.type)
        {
            case ProjectType.Academic:
                return 'academic';
            case ProjectType.Professional:
                return 'professional';
            case ProjectType.Miscellaneous:
                return 'misc.';
        }
        return '';
    };

     const handleMouseMove = (event: MouseEvent) => {
         if(!wrapperRef.current) return;

         const {clientX, clientY} = event;
         const x = clientX/window.innerWidth * 100;
         const y = clientY/window.innerHeight * 100;

         wrapperRef.current?.animate({
                 left: `${x}%`,
                 top: `${y}%`,
             }, {duration: 3000, fill: 'forwards'});
     };

     useEffect(() => {
         if(isSetup.current) return;

         addEventListener('mousemove', handleMouseMove);

         isSetup.current = true;
     }, [])

    return (
        project &&
        <div ref={wrapperRef}
            className="info-card__wrapper"
             style={{top: `0%`, left: `0%`}}
             onClick={handleOnMouseClick}
        >
            <div className='info-card__blur-div'/>
            <h3>{project?.title}</h3>
            <h4>{project?.year}</h4>
            <h4>{getProjectTypeText()}</h4>
            <h4>{project?.role}</h4>

            {
                project?.url &&
                <a href={project.url}>
                    click to visit
                </a>
            }
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 2H24M24 2V25M24 2L1.69697 24.303" stroke="white" strokeWidth="4"/>
            </svg>
        </div>
    );
 };

export default InfoCard;