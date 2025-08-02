import React, { useState } from "react";

type ToggleButtonItem = {
    title: string;
    value: 'immersive-media' | 'full-stack' | 'data-driven';
}

interface ToggleMenuProps {
    buttons: ToggleButtonItem[],
    activeOption: string,
    onClick: (value:  'immersive-media' | 'full-stack' | 'data-driven') => void
}

interface ToggleButtonProps {
    desc: ToggleButtonItem,
    isActive: boolean,
    onClick: (value:  'immersive-media' | 'full-stack' | 'data-driven') => void
}

const ToggleButton = ({desc, isActive, onClick}: ToggleButtonProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <button className='relative border w-[24px] h-[24px] p-1'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => onClick(desc.value)}
        >
            {(isActive || isHovered) && <div className='w-full h-full bg-white'></div> }

            {(isHovered) &&
                <div className='absolute border
                 px-2 py-1 top-1/2 -translate-y-1/2 left-[3.5rem] whitespace-nowrap
                 backdrop-blur-md linear-to-t from-black/5 to-white/10'>
                    <p className=''>{desc.title}</p>
                </div>
            }

        </button>
    )
};

const ToggleMenu = ({
                        buttons,
                        activeOption,
                        onClick
                    }: ToggleMenuProps) => {

    return (<>
    <div className='flex flex-col gap-6 p-3 border rounded-lg'>
            {
                buttons.map((buttonItem, index) =>
                        <ToggleButton key={index}
                                      desc={buttonItem}
                                      isActive={buttonItem.value === activeOption}
                                      onClick={onClick}
                        />
                )
            }
        </div>
    </>);
};

export default ToggleMenu;