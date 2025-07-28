'use client'
import React, {useRef, useState, useEffect, useCallback, useMemo} from 'react';
import {motion, useAnimation, AnimatePresence} from "framer-motion";

interface Dot {
    cx: number;
    cy: number;
    xOffset: number;
    yOffset: number;
    _animating: boolean;
    id: string;
    handleInertia?: (pushX: number, pushY: number) => Promise<void>;
}

export interface DotGridProps {
    dotSize?: number;
    gap?: number;
    baseColor?: string;
    activeColor?: string;
    proximity?: number;
    speedTrigger?: number;
    shockRadius?: number;
    shockStrength?: number;
    maxSpeed?: number;
    resistance?: number;
    returnDuration?: number;
    className?: string;
    style?: React.CSSProperties;
}

const DotGrid: React.FC<DotGridProps> = ({
                                             dotSize = 3,
                                             gap = 16,
                                             baseColor = "#555",
                                             activeColor = "#5227FF",
                                             proximity = 50,
                                             speedTrigger = 10,
                                             shockRadius = 100,
                                             shockStrength = 5,
                                             maxSpeed = 5000,
                                             resistance = 750,
                                             returnDuration = 1.5,
                                             className = "",
                                             style
                                         }: DotGridProps) => {

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [dots, setDots] = useState<Dot[]>([]);
    const [mousePos, setMousePos] = useState<{x: number, y: number}>({x: 0, y: 0});
    const pointerRef = useRef({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        speed: 0,
        lastTime: 0,
        lastX: 0,
        lastY: 0,
    });

    const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
    const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

    const createGrid = useCallback(() => {
        const wrapper = wrapperRef.current;
        if(!wrapper) return;

        const {width,height} = wrapper.getBoundingClientRect();

        const cols = Math.floor((width + gap) / (dotSize + gap));
        const rows = Math.floor((height + gap) / (dotSize + gap));
        const cell = dotSize + gap;

        const gridW = cell * cols - gap;
        const gridH = cell * rows - gap;

        const extraX = width - gridW;
        const extraY = height - gridH;

        const startX = extraX / 2 + dotSize / 2;
        const startY = extraY / 2 + dotSize / 2;

        const newDots: Dot[] = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cx = startX + x * cell;
                const cy = startY + y * cell;
                newDots.push({
                    cx,
                    cy,
                    xOffset: 0,
                    yOffset: 0,
                    _animating: false,
                    id: `dot-${x}-${y}`
                });
            }
        }
        setDots(newDots);
    }, [dotSize, gap]);

    const AnimatedDot = React.memo(({ dot, color }: { dot: Dot; color: string }) => {
        const controls = useAnimation();

        const handleInertia = useCallback(async (pushX: number, pushY: number) => {
            if (dot._animating) return;
            dot._animating = true;

            const distance = Math.hypot(pushX, pushY);
            const duration = Math.min(2, distance / 100);

            try {
                await controls.start({
                    x: pushX,
                    y: pushY,
                    transition: {
                        duration,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }
                });

                await controls.start({
                    x: 0,
                    y: 0,
                    transition: {
                        duration: returnDuration,
                        type: "spring",
                        damping: 12,
                        stiffness: 100,
                        restDelta: 0.01
                    }
                });
            } catch (error) {
                console.warn('Animation interrupted:', error);
            } finally {
                dot._animating = false;
            }
        }, [controls, dot, returnDuration]);

        React.useEffect(() => {
            const currentDot = dot;
            currentDot.handleInertia = handleInertia;
            return () => {
                currentDot.handleInertia = undefined;
            };
        }, [handleInertia, dot]);

        return (
            <motion.div
                animate={controls}
                className="absolute pointer-events-none"
                style={{
                    left: dot.cx - dotSize / 2,
                    top: dot.cy - dotSize / 2,
                    width: dotSize,
                    height: dotSize,
                }}
            >
                <div
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: color }}
                />
            </motion.div>
        );
    });
    
    AnimatedDot.displayName = 'AnimatedDot';

    useEffect(() => {
        createGrid();
        let ro: ResizeObserver | null = null;
        if ("ResizeObserver" in window) {
            ro = new ResizeObserver(createGrid);
            wrapperRef.current && ro.observe(wrapperRef.current);
        }
        return () => {
            if (ro) ro.disconnect();
            else window.removeEventListener("resize", createGrid);
        };
    }, [createGrid]);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!wrapperRef.current) return;
            const rect = wrapperRef.current.getBoundingClientRect();
            if (!rect) return;

            const now = performance.now();
            const pr = pointerRef.current;
            const dt = pr.lastTime ? now - pr.lastTime : 16;
            const dx = e.clientX - pr.lastX;
            const dy = e.clientY - pr.lastY;
            let vx = (dx / dt) * 1000;
            let vy = (dy / dt) * 1000;
            let speed = Math.hypot(vx, vy);

            if (speed > maxSpeed) {
                const scale = maxSpeed / speed;
                vx *= scale;
                vy *= scale;
                speed = maxSpeed;
            }

            pr.lastTime = now;
            pr.lastX = e.clientX;
            pr.lastY = e.clientY;
            pr.vx = vx;
            pr.vy = vy;
            pr.speed = speed;

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            pr.x = x;
            pr.y = y;
            setMousePos({ x, y });

            // Handle speed-based inertia
            if (speed > speedTrigger) {
                dots.forEach((dot) => {
                    const dist = Math.hypot(dot.cx - x, dot.cy - y);
                    if (dist < proximity && !dot._animating && dot.handleInertia) {
                        const pushX = (dot.cx - x) + vx * 0.005;
                        const pushY = (dot.cy - y) + vy * 0.005;
                        dot.handleInertia(pushX, pushY);
                    }
                });
            }
        };

        const onClick = (e: MouseEvent) => {
            if (!wrapperRef.current) return;
            const rect = wrapperRef.current.getBoundingClientRect();
            if (!rect) return;

            const cx = e.clientX - rect.left;
            const cy = e.clientY - rect.top;

            dots.forEach((dot) => {
                const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
                if (dist < shockRadius && !dot._animating && dot.handleInertia) {
                    const falloff = Math.max(0, 1 - dist / shockRadius);
                    const pushX = (dot.cx - cx) * shockStrength * falloff;
                    const pushY = (dot.cy - cy) * shockStrength * falloff;
                    dot.handleInertia(pushX, pushY);
                }
            });
        };

        window.addEventListener("click", onClick);

        return () => {
            window.removeEventListener("click", onClick);
        };
    }, [dots, maxSpeed, speedTrigger, proximity, shockRadius, shockStrength]);

    const getDotColor = useCallback((dot: Dot) => {
        const dx = dot.cx - mousePos.x;
        const dy = dot.cy - mousePos.y;
        const dsq = dx * dx + dy * dy;
        const proxSq = proximity * proximity;

        if (dsq <= proxSq && proximity > 0) {
            const dist = Math.sqrt(dsq);
            const t = 1 - dist / proximity;
            const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
            const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
            const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
            return `rgb(${r},${g},${b})`;
        }
        return baseColor;
    }, [mousePos, proximity, baseRgb, activeRgb, baseColor]);

    return (
        <section
            className={`absolute top-0 left-0 w-screen h-screen z-0 ${className}`}
            style={style}
        >
            <div ref={wrapperRef} className="w-full h-full relative overflow-hidden">
                <AnimatePresence>
                    {dots.map((dot) => (
                        <AnimatedDot
                            key={dot.id}
                            dot={dot}
                            color={getDotColor(dot)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
}



//#region Utilities

const hexToRgb = (hex: string): { r: number, g: number, b: number } => {
    const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return {r: 0, g: 0, b: 0};
    return {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16),
    };
}

const throttle = <T extends (...args: any[]) => void>(func: T, limit: number): T => {
    let lastCall = 0;
    return function (this: any, ...args: any[]) {
        const now = performance.now();
        if (now - lastCall >= limit) {
            lastCall = now;
            func.apply(this, args);
        }
    } as T;
};

//#endregion

export default DotGrid;