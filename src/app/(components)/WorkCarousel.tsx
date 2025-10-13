'use client'
import * as THREE from 'three';
import {useRef, useState, useEffect} from "react";
import {WebGLRenderer} from "three";

const WorkCarousel = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameIdRef = useRef<number | null>(null);
    const rendererRef = useRef<WebGLRenderer>(null);
    const mouseRef = useRef({
        isDragging: false,
        previousX: 0,
        previousY: 0,
        targetRotation: 0,
        currentRotation: 0,
    });

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();

        const rect = canvasRef.current.getBoundingClientRect();
        const camera = new THREE.PerspectiveCamera(
            75,
            rect.width / rect.height,
            0.1,
            1000
        );
        camera.position.set(0.5, 0, 2.0);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true
        });
        renderer.setSize(rect.width, rect.height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);
        rendererRef.current = renderer;

        const frameGroup = new THREE.Group();

        const numFrames = 10;
        const radius = 0.6;
        const frames: THREE.Mesh[] = [];

        for (let i = 0; i < numFrames; i++) {
            const geometry = new THREE.PlaneGeometry(1, 1);
            const material = new THREE.MeshPhongMaterial({
                color: new THREE.Color(150, 150, 150),
                transparent: true,
                side: THREE.DoubleSide
            });
            const frame = new THREE.Mesh(geometry, material);

            const angle = (i / numFrames) * Math.PI * 2;
            frame.position.x = Math.cos(angle) * radius;
            frame.position.z = Math.sin(angle) * radius;

            frame.rotation.y = - i * 360 / numFrames * Math.PI / 180;

            frameGroup.add(frame);
            frames.push(frame);
        }

        const initialTilt = -5 * Math.PI / 180;
        frameGroup.rotation.z = initialTilt;

        scene.add(frameGroup);

        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        const handleMouseDown = (event: MouseEvent) => {
            mouseRef.current.isDragging = true;
            mouseRef.current.previousX = event.clientX;
            mouseRef.current.previousY = event.clientY;
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (!mouseRef.current.isDragging) return;

            const deltaX = event.clientX - mouseRef.current.previousX;

            mouseRef.current.targetRotation += deltaX * 0.01;

            mouseRef.current.previousX = event.clientX;
            mouseRef.current.previousY = event.clientY;
        };

        const handleMouseUp = () => {
            mouseRef.current.isDragging = false;
        };

        canvasRef.current.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        const animate = () => {
            animationFrameIdRef.current = requestAnimationFrame(animate);

            const lerpFactor = 0.005;
            mouseRef.current.currentRotation += (mouseRef.current.targetRotation - mouseRef.current.currentRotation) * lerpFactor;

            // Create the tilted axis: Y-axis rotated by the tilt amount around Z
            const tiltedAxis = new THREE.Vector3(0, 1, 0);
            tiltedAxis.applyAxisAngle(new THREE.Vector3(0, 0, 1), initialTilt);

            // Set rotation around the tilted axis
            frameGroup.rotation.set(0, 0, 0);
            frameGroup.rotateOnAxis(tiltedAxis, mouseRef.current.currentRotation);

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            if(!canvasRef || !canvasRef.current) return;
            const rect = canvasRef.current.getBoundingClientRect();
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            renderer.setSize(rect.width, rect.height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            window.removeEventListener('resize', handleResize);

            if (canvasRef.current) {
                canvasRef.current.removeEventListener('mousedown', handleMouseDown);
            }
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);

            frames.forEach((frame) => {
                frame.geometry.dispose();
            });

            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
        };
    }, []);

    return (<>
        <canvas ref={canvasRef} className='h-full w-full z-20'/>
    </>);
};

export default WorkCarousel;