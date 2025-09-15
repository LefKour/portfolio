'use client'
import {useState, useEffect, useRef, useCallback} from 'react';
import * as THREE from 'three';
import {OrthographicCamera, WebGLRenderer} from "three";
import { useDeviceDetection } from "@/lib/hooks";

interface AnimatedGridProps {

}

// Configuration types
const GRID_MODES = {
    TEXTURE_SLIDESHOW: 'textureSlideshow',
    RIPPLE_EFFECT: 'rippleEffect',
    FLUID_SIMULATION: 'fluidSimulation',
    SINE_WAVE: 'sineWave' // Original mode
};

const AnimatedGrid = ({}:AnimatedGridProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<WebGLRenderer>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const animationFrameIdRef = useRef<number | null>(null);
    const { isMobile, isTablet, screenWidth } = useDeviceDetection();

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    
    const getGridDensity = useCallback(() => {
        if (isMobile) return 20.0;
        if (isTablet) return 60.0;
        return 100.0;
    }, [isMobile, isTablet]);

    useEffect(() => {
        if (!canvasRef || !canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: canvasRef.current,
            alpha: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);
        rendererRef.current = renderer;

        const fragmentShader = `
          uniform float u_time;
          uniform vec2 u_resolution;
          uniform vec2 u_mouse;
          uniform float u_gridDensity;
    
          float circle(vec2 pos, vec2 center, float radius){
            float dist = distance(pos, center);
            return 1.0 - smoothstep(radius - 0.01, radius + 0.01, dist);
          }
    
          void main() {
              vec2 st = gl_FragCoord.xy / u_resolution.xy;
              
              float time = u_time * 0.0001;
              
              // STEP 1: Create Responsive Staggered Grid
              float referenceSize = min(u_resolution.x, u_resolution.y);
              float gridSize = u_gridDensity * (referenceSize / 800.0);
              
              vec2 aspectRatio = u_resolution.xy / referenceSize;
              vec2 correctedSt = st * aspectRatio;
              
              vec2 gridSt = correctedSt * gridSize;
              vec2 gridId = floor(gridSt);
              vec2 gridPos = fract(gridSt);
              
              // STEP 2: Apply Staggered Offset
              float rowOffset = mod(gridId.y, 2.0) * 0.5;
              gridSt.x += rowOffset;
              gridId = floor(gridSt);
              gridPos = fract(gridSt);
              
              vec2 nodePos = vec2(0.5, 0.5);
              
              // STEP 3: Calculate Wave with Mouse Interaction
              vec2 worldPos = gridId / gridSize;
              
              // Convert mouse position to world coordinates
              vec2 mouseWorldPos = u_mouse.xy / u_resolution.xy * aspectRatio;
              
              // Calculate distance from current grid node to mouse
              float distToMouse = distance(worldPos, mouseWorldPos);
              
              // Create mouse influence (stronger when closer)
              float mouseInfluence = 1.0 - smoothstep(0.0, 0.3, distToMouse);
              float mouseWave = sin(distToMouse * 30.0 - time * 50.0) * mouseInfluence;
              
              float waveFrequency = 8.0;
              float waveSpeed = 2.0;
              
              // Original sine wave
              float originalWave = sin(worldPos.x * waveFrequency + time * waveSpeed) * 
                                  sin(worldPos.y * waveFrequency * 0.7 + time * waveSpeed * 0.8);
              
              // Combine original wave with mouse interaction
              float wave = originalWave + mouseWave * 0.8;
              
              float waveInfluence = wave * 0.5 + 0.5;
              
              // STEP 4: Apply Wave to Circle Properties
              float baseRadius = 0.05;
              float maxRadius = 0.2;
              float circleRadius = baseRadius + (maxRadius - baseRadius) * waveInfluence;
              
              float minOpacity = 0.1;
              float maxOpacity = 1.0;
              float opacity = minOpacity + (maxOpacity - minOpacity) * waveInfluence;
              
              // STEP 5: Calculate Chromatic Aberration
              // Movement intensity affects aberration strength
              float movementIntensity = abs(mouseWave) + abs(sin(time * 10.0)) * 0.3;
              float aberrationStrength = movementIntensity * 0.003 + mouseInfluence * 0.002;
              
              // Direction of aberration based on movement and position
              vec2 aberrationDir = normalize(worldPos - mouseWorldPos + vec2(sin(time * 5.0), cos(time * 3.0)) * 0.1);
              vec2 redOffset = aberrationDir * aberrationStrength;
              vec2 blueOffset = -aberrationDir * aberrationStrength;
              
              // Render RGB channels with offsets
              float redCircle = circle(gridPos + redOffset, nodePos, circleRadius);
              float greenCircle = circle(gridPos, nodePos, circleRadius);
              float blueCircle = circle(gridPos + blueOffset, nodePos, circleRadius);
              
              // STEP 6: Apply Chromatic Color Channels
              float baseIntensity = 0.3 + 0.7 * waveInfluence;
              
              // Add some color variation based on movement
              float redIntensity = baseIntensity + mouseInfluence * 0.2;
              float greenIntensity = baseIntensity;
              float blueIntensity = baseIntensity + abs(mouseWave) * 0.3;
              
              vec3 color = vec3(
                redCircle * redIntensity,
                greenCircle * greenIntensity, 
                blueCircle * blueIntensity
              );
              
              // STEP 7: Animate with Pulse Effect
              float pulseEffect = 0.8 + 0.2 * sin(time * 4.0 + waveInfluence * 10.0);
              color *= pulseEffect;
              
              // STEP 8: Apply Opacity
              vec3 finalAlpha = vec3(redCircle, greenCircle, blueCircle) * opacity;
              
              // STEP 9: Final Composition
              vec3 backgroundColor = vec3(0.0);
              vec3 finalColor = mix(backgroundColor, color, finalAlpha);
              
              gl_FragColor = vec4(finalColor, 1.0);
          }
        `;

        const vertexShader = `
            void main() {
              gl_Position = vec4(position, 1.0);
            }
        `;

        const material = new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
            uniforms: {
                u_time: {value:0.0},
                u_resolution: {value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
                u_mouse: { value: new THREE.Vector2(0.0, 0.0) },
                u_gridDensity: { value: getGridDensity() }
            }
        });
        materialRef.current = material;

        const geometry = new THREE.PlaneGeometry(2,2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            renderer.setSize(width, height);
            material.uniforms.u_resolution.value.set(width, height);
        };

        const handleMouseMove = (event: MouseEvent) => {
            const rect = renderer.domElement.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = rect.height - (event.clientY - rect.top);

            setMousePos({ x, y });
            material.uniforms.u_mouse.value.set(x, y);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        const animate = (time: number) => {
            material.uniforms.u_time.value = time;
            renderer.render(scene, camera);
            animationFrameIdRef.current = requestAnimationFrame(animate);
        };

        animate(0);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);

            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }

            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    // Update grid density when device type changes
    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.u_gridDensity.value = getGridDensity();
        }
    }, [getGridDensity]);

    return (<>
        <canvas ref={canvasRef} className='absolute w-full h-full z-0' />
    </>);
};

export default AnimatedGrid;