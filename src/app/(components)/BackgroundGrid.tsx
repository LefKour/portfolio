import * as THREE from 'three';
import { useState, useEffect, useRef } from 'react';

import GridExperience from "@/lib/scenes/implemented scenes/GridExperience";

const BackgroundGrid = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if(!canvasRef || !canvasRef.current) return;

        const gridExperience = new GridExperience(canvasRef.current);
        gridExperience.setup();
        gridExperience.render();

        return () => {
            gridExperience.dispose();
        };
    }, []);

    return (<>
        <div className="w-screen h-screen bg-white absolute">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    </>);
}

export default BackgroundGrid;