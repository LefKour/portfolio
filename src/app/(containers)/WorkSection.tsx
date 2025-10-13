import React, {useEffect, useRef} from "react";
import { useDeviceDetection } from "@/lib/hooks";
import { useLoadingContext } from "@/lib/hooks/useLoadingContext";
import WorkCarousel from "@/app/(components)/WorkCarousel";


const WorkSection = () => {
    const { isMobile } = useDeviceDetection();
    const { isLoading } = useLoadingContext();

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
        <section data-tag={"work-section"}
                 className='relative w-screen h-screen flex justify-center items-center m-0 p-0 bg-black'>
            <canvas ref={canvasRef} className="absolute w-full h-full"/>

            <div className={"absolute top-30 left-10 flex gap-2 items-end z-10"}>
                <h3 className="text-8xl">03</h3>
                <p className={"text-2xl font-light"}>work</p>
            </div>

            <div className={"relative w-full h-full flex"}>
                <div className={"relative h-full w-2/3"}>
                    <WorkCarousel/>
                </div>

                <div className={"h-full w-1/3"}>

                </div>
            </div>

        </section>
    );
};

export default WorkSection;

