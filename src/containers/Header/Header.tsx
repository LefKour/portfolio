import React, {useCallback, useEffect, useRef} from "react";
import {titles} from '../../utils/constants.ts';

import './Header.scss';

const Header = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // HTML Elements Refs
    const blobRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const professionRef = useRef<HTMLHeadingElement>(null);

    // State Refs
    const isIntervalInitialized = useRef<boolean>(false);
    const textAnimationInterval = useRef<number | undefined>(undefined);
    const transitionInterval = useRef<number | undefined>(undefined);
    const textIndex = useRef<number | undefined>(1);

    useEffect(() => {
        if (isIntervalInitialized.current) return;

        clearInterval(textAnimationInterval.current);
        textAnimationInterval.current = setInterval(() => {
            if (!professionRef.current || !textIndex.current) return;

            clearInterval(transitionInterval.current);

            const targetText = titles[textIndex.current];
            textIndex.current = textIndex.current + 1 > titles.length - 1 ? 0 : textIndex.current + 1;

            professionRef.current.textContent = targetText;

            let iteration = 0;

            transitionInterval.current = setInterval(() => {
                if (!professionRef.current) {
                    clearInterval(transitionInterval.current);
                    return;
                }

                professionRef.current.classList.add('transitioning');

                professionRef.current.textContent = targetText
                    .split('')
                    .map((_, i) => {
                        if (i < iteration) {
                            return targetText[i];
                        }

                        return letters[Math.floor(Math.random() * 26)];
                    }).join('');

                if (iteration >= targetText.length) {
                    clearInterval(transitionInterval.current);
                    professionRef.current.classList.remove('transitioning');
                    return;
                }

                iteration += 1 / 3;
            }, 30);
        }, 5000);

        isIntervalInitialized.current = true;
    }, []);

    const handleContainerMouseEnter = () => {
        if (!blobRef.current) return;
        blobRef.current.style.opacity = '1';
    };

    const handleContainerMouseLeave = () => {
        if (!blobRef.current) return;
        blobRef.current.style.opacity = '0.5';
    }

    const handleContainerMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if (!blobRef.current) return;

        const {clientX, clientY} = event;
        const [width, height] =
            [parseFloat(blobRef.current.style.width.replace('px', '')),
                parseFloat(blobRef.current.style.height.replace('px', ''))];

        const X = clientX - width * 0.5;
        const Y = clientY - height * 0.5;

        blobRef.current.animate({
                left: `${X}px`,
                top: `${Y}px`
            }, {duration: 3000, fill: 'forwards'}
        );
    }, []);

    return (
        <div className="header-container" ref={containerRef}
             onMouseEnter={handleContainerMouseEnter}
             onMouseMove={handleContainerMouseMove}
             onMouseLeave={handleContainerMouseLeave}
        >
            <div className="header-background__blob" ref={blobRef}
                 style={{width: '200px', height: '200px'}}/>
            <div className="header-background__blob-blur"/>
            <div className="header-subcontainer">
                <h1 className="first-name"> ELEFTHERIOS </h1>
            </div>
            <div className="header-subcontainer">
                <h1 className="last-name"> KOURKOPOULOS </h1>
            </div>
            <div className="header-subcontainer header-grid">
                <div className="border">
                    <h3 className="profession-text" ref={professionRef}>software developer</h3>
                </div>
                <div className="border">
                    <a href="https://www.linkedin.com/in/eleftherios-kourkopoulos-b27b32b8/"
                       target="_blank">
                        <h4>linkedin</h4>
                    </a>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 2H24M24 2V25M24 2L1.69697 24.303" stroke="white" strokeWidth="4"/>
                    </svg>
                </div>
                <div className="border">
                    <a href="https://github.com/LefKour/portfolio/blob/main/Portfolio%20_%20Eleftherios%20Kourkopoulos.pdf?raw=true"
                       target="_blank">
                        <h4>download portfolio</h4>
                    </a>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 2H24M24 2V25M24 2L1.69697 24.303" stroke="white" strokeWidth="4"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Header;
