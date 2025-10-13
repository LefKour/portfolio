import { useState } from "react";

interface SectionIndicatorProps {
    sections: string[],
    activeSection: string,
    onIndicatorClick: (section: string) => void;
}

const SectionIndicator = ({
                              sections,
                              activeSection,
                              onIndicatorClick
                           }: SectionIndicatorProps) => {
    const [hasElementHovered, setHasElementHovered] = useState<boolean>(false);

    return (
        <div className="fixed flex right-10 h-screen justify-center z-100">
            <div className="flex flex-col justify-center">
                <ul className="relative flex flex-col gap-25 justify-center items-end "
                    onMouseEnter={() => setHasElementHovered(true)}
                    onMouseLeave={() => setHasElementHovered(false)}
                >
                    {sections.map((value, index) =>
                        <li
                            key={index}
                            className={`
                    ${!hasElementHovered && activeSection === sections[index] ? "text-5xl" : "text-lg"} 
                    hover:text-6xl transition-all duration-300 ease-in-out cursor-pointer`}
                            onClick={() => onIndicatorClick(sections[index])}
                        >{(index + 1).toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false
                        })}</li>
                    )}
                </ul>
            </div>
        </div>

    );
}

export default SectionIndicator;