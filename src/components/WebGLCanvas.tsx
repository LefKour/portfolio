import React, { useRef, useEffect } from 'react';
import Renderer from '@/lib/webgl/Renderer';
import Scene from '@/lib/webgl/Scene';

interface WebGLCanvasProps {
    sceneClass: new (renderer: Renderer) => Scene;
    width?: number;
    height?: number;
    className?: string;
}

const WebGLCanvas: React.FC<WebGLCanvasProps> = ({
                                                     sceneClass,
                                                     width,
                                                     height,
                                                     className
                                                 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<Renderer | null>(null);
    const sceneRef = useRef<Scene | null>(null);
    const rafRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const renderer = new Renderer();
        if (!renderer.initialize(canvas)) {
            console.error('Failed to initialize WebGL renderer');
            return;
        }

        const scene = new sceneClass(renderer);
        scene.initialize().then(success => {
            if (success) {
                sceneRef.current = scene;
                lastTimeRef.current = performance.now();
                rafRef.current = requestAnimationFrame(animate);
            } else {
                console.error('Failed to initialize WebGL scene');
            }
        });

        const animate = (now: number) => {
            const deltaTime = (now - lastTimeRef.current) / 1000; // seconds
            lastTimeRef.current = now;

            if (sceneRef.current) {
                sceneRef.current.update(deltaTime);
                sceneRef.current.render();
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            if (sceneRef.current) {
                // Use provided dimensions or adapt to container
                const w = width || canvas.clientWidth;
                const h = height || canvas.clientHeight;
                sceneRef.current.resize(w, h);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            if (sceneRef.current) {
                sceneRef.current.dispose();
            }
        };

    }, [sceneClass, width, height]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                width: width ? `${width}px` : '100%',
                height: height ? `${height}px` : '100%'
            }}
        />
    );
}

export default WebGLCanvas;