import { useEffect, useRef } from 'react';
import { Experience } from "@/lib/scenes/Experience";
import DraggableWindow from "@/app/(components)/DraggableWindow";

type ExperienceConstructor = new (canvas: HTMLCanvasElement) => Experience;

interface ExperienceWindowProps {
    ExperienceClass: ExperienceConstructor;
    initialWidth?: number;
    initialHeight?: number;
    initialX?: number;
    initialY?: number;
    onClose?: () => void;
    windowId?: string;
}

const ExperienceWindow = ({
                              ExperienceClass,
                              initialWidth = 600,
                              initialHeight = 400,
                              initialX = 100,
                              initialY = 100,
                              onClose,
                              windowId = "window-1"
                          }: ExperienceWindowProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const experienceRef = useRef<Experience | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const experience = new ExperienceClass(canvasRef.current);
        experienceRef.current = experience;

        if (experience.start) {
            experience.start();
        }

        return () => {
            if (experience.dispose) {
                experience.dispose();
            }
            experienceRef.current = null;
        };
    }, [ExperienceClass]);

    return (
        <DraggableWindow
            title={experienceRef.current?.experienceTitle}
            initialWidth={initialWidth}
            initialHeight={initialHeight}
            initialX={initialX}
            initialY={initialY}
            onClose={onClose}
            windowId={windowId}
        >
            <div className="absolute background-grid w-full h-full bg-transparent">
                <canvas ref={canvasRef} className="w-full h-full"/>
            </div>
        </DraggableWindow>
    );
}

export default ExperienceWindow;