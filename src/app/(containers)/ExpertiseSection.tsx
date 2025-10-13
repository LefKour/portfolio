import React, {useEffect, useRef} from "react";
import ExpertiseCard from "@/app/(components)/ExpertiseCard";

const ExpertiseSection = () => {
    // const { isMobile } = useDeviceDetection();
    // const { isLoading } = useLoadingContext();

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const GRID_SPACING = 200;
    const GRID_COLOR = "#d1d5db80";

    const drawGrid = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        ctx.scale(dpr, dpr);

        ctx.lineWidth = 1;
        ctx.strokeStyle = GRID_COLOR;

        for(let i = GRID_SPACING; i < rect.width; i+= GRID_SPACING) {
            ctx.beginPath();
            ctx.moveTo(i + 0.5, 0);
            ctx.lineTo(i + 0.5, rect.height);
            ctx.stroke();
        }
    };

    useEffect(() => {
        drawGrid();

        const handleWindowResize = () => drawGrid();

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <section data-tag={"expertise-section"}
                 className='relative w-screen h-screen flex flex-col justify-center items-center m-0 p-0 bg-black'>

            <div className={"relative w-full h-full"}>
                <canvas ref={canvasRef} className="absolute w-full h-full"/>
                <div className='absolute top-0 w-full h-62 bg-linear-to-b from-black to-black/0'/>

                <div className={"absolute top-30 left-10 flex gap-2 items-end"}>
                    <h3 className="text-8xl">02</h3>
                    <p className={"text-2xl font-light"}>expertise</p>
                </div>

                <p className={"absolute text-3xl font-light bottom-10 left-1/2 mr-[20%]"}>I work at the intersection of creativity and technology.
                    I can create immersive states.
                </p>
            </div>

            <div className={"w-full h-full flex gap-1"}>
                <ExpertiseCard index={1}>
                    <p className={"text-light"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultrices
                        iaculis lacus, eu ornare odio porttitor nec. Donec mauris ante, interdum varius tortor at,
                        pellentesque vulputate leo.
                    </p>
                </ExpertiseCard>
                <ExpertiseCard index={2}>
                    <p className={"text-light"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
                        ultrices
                        iaculis lacus, eu ornare odio porttitor nec. Donec mauris ante, interdum varius tortor at,
                        pellentesque vulputate leo.
                    </p>
                </ExpertiseCard>
                <ExpertiseCard index={3}>
                    <p className={"text-light"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
                        ultrices
                        iaculis lacus, eu ornare odio porttitor nec. Donec mauris ante, interdum varius tortor at,
                        pellentesque vulputate leo.
                    </p>
                </ExpertiseCard>
            </div>

        </section>
    );
};

export default ExpertiseSection;

