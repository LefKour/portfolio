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

        // Scene setup
        const scene = new THREE.Scene();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 2.5);
        // camera.position.z = 5;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);
        rendererRef.current = renderer;

        const frameGroup = new THREE.Group();

        // Create multiple cubes arranged in a circle
        const numFrames = 10;
        const radius = 1;
        const frames: THREE.Mesh[] = [];

        for (let i = 0; i < numFrames; i++) {
            const geometry = new THREE.PlaneGeometry(1, 1);
            const material = new THREE.MeshPhongMaterial({
                color: new THREE.Color(150, 150, 150),
                side: THREE.DoubleSide
            });
            const frame = new THREE.Mesh(geometry, material);

            const angle = (i / numFrames) * Math.PI * 2;
            frame.position.x = Math.cos(angle) * radius;
            frame.position.z = Math.sin(angle) * radius;

            frame.rotation.y = - i * 360 / numFrames * Math.PI / 180;

            // scene.add(frame);
            frameGroup.add(frame);
            frames.push(frame);
        }

        // Tilt the entire group 10 degrees diagonally
        const initialTilt = 45 * Math.PI / 180;
        // frameGroup.rotation.set(initialTilt, initialTilt, 0);

        scene.add(frameGroup);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // Mouse event handlers
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

        // Add mouse event listeners
        canvasRef.current.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        // Animation loop
        const animate = () => {
            animationFrameIdRef.current = requestAnimationFrame(animate);

            const lerpFactor = 0.005;
            mouseRef.current.currentRotation += (mouseRef.current.targetRotation - mouseRef.current.currentRotation) * lerpFactor;
            frameGroup.rotation.y = initialTilt + mouseRef.current.currentRotation;

            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            window.removeEventListener('resize', handleResize);

            // Remove mouse event listeners
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
        <canvas ref={canvasRef} className='w-full h-full bg-transparent'/>
    </>);
};

export default WorkCarousel;