'use client'
import {useState, useEffect, useRef} from 'react';

interface PressureTextProps {
    text?: string;
    fontFamily?: string;
    fontUrl?: string;
    width?: boolean;
    weight?: boolean;
    italic?: boolean;
    alpha?: boolean;
    flex?: boolean;
    stroke?: boolean;
    scale?: boolean;
    textColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    className?: string;
    minFontSize?: number;
    textSizeRem?: number;
    onClick?: () => void;
}


const PressureText = ({
                          text = "Title",
                          fontFamily = 'Open Sans',
                          fontUrl = 'https://fonts.googleapis.com/css2?family=Bitcount+Prop+Single:wght@100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap',
                          width = true,
                          weight = true,
                          italic = true,
                          alpha = false,
                          flex = true,
                          stroke = false,
                          scale = false,
                          textColor = '#FFFFFF',
                          strokeColor = '#FF0000',
                          strokeWidth = 2,
                          className = '',
                          minFontSize = 24,
                          textSizeRem = 4,
                          onClick
}: PressureTextProps) => {

    // Refs
    const containerRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
    const currentValuesRef = useRef<{weight: number, width: number, ital: number, alpha: number}[]>([]);

    const mouseRef = useRef({x:0, y:0});
    const cursorRef = useRef({x:0, y:0});

    // States
    const [fontSize, setFontSize] = useState(minFontSize);
    const [scaleY, setScaleY] = useState(1);
    const [lineHeight, setLineHeight] = useState(1);
    const [isHovering, setIsHovering] = useState(false);
    const [responsiveSize, setResponsiveSize] = useState(textSizeRem);

    const words = text.split(' ');
    const chars = text.split('');

    // Functions
    const dist = (a: {x: number; y: number}, b: {x: number; y: number}) => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    const setSize = () => {
        if (!containerRef.current || !titleRef.current) return;

        const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

        let newFontSize = containerW / (chars.length / 2);
        newFontSize = Math.max(newFontSize, minFontSize);

        setFontSize(newFontSize);
        setScaleY(1);
        setLineHeight(1);

        requestAnimationFrame(() => {
            if (!titleRef.current) return;
            const textRect = titleRef.current.getBoundingClientRect();

            if (scale && textRect.height > 0) {
                const yRatio = containerH / textRect.height;
                setScaleY(yRatio);
                setLineHeight(yRatio);
            }
        });
    };

    // Use Effects
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorRef.current.x = e.clientX;
            cursorRef.current.y = e.clientY;
        };
        
        const handleTouchMove = (e: TouchEvent) => {
            const t = e.touches[0];
            cursorRef.current.x = t.clientX;
            cursorRef.current.y = t.clientY;
        };
        
        const handleTouchStart = (e: TouchEvent) => {
            const t = e.touches[0];
            cursorRef.current.x = t.clientX;
            cursorRef.current.y = t.clientY;
            setIsHovering(true);
        };
        
        const handleTouchEnd = () => {
            setIsHovering(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);

        if (containerRef.current) {
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            mouseRef.current.x = left + width / 2;
            mouseRef.current.y = top + height / 2;
            cursorRef.current.x = mouseRef.current.x;
            cursorRef.current.y = mouseRef.current.y;
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);


    // Responsive sizing
    useEffect(() => {
        const updateResponsiveSize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setResponsiveSize(textSizeRem * 0.7);
            } else if (width < 768) {
                setResponsiveSize(textSizeRem * 0.85);
            } else if (width < 1024) {
                setResponsiveSize(textSizeRem * 1);
            } else {
                setResponsiveSize(textSizeRem);
            }
        };
        
        updateResponsiveSize();
        window.addEventListener('resize', updateResponsiveSize);
        return () => window.removeEventListener('resize', updateResponsiveSize);
    }, [textSizeRem]);

    // Text Scaling
    useEffect(() => {
        setSize();
        window.addEventListener('resize', setSize);
        return () => window.removeEventListener('resize', setSize);
    }, [scale, text]);

    // Animator
    useEffect(() => {
        let rafId: number;
        const animate = () => {
            mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
            mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

            if (titleRef.current) {
                const titleRect = titleRef.current.getBoundingClientRect();
                const maxDist = titleRect.width / 2;

                spansRef.current.forEach((span, i) => {
                    if (!span) return;

                    if (!currentValuesRef.current[i]) {
                        currentValuesRef.current[i] = { weight: 400, width: 100, ital: 0, alpha: 1 };
                    }

                    const current = currentValuesRef.current[i];
                    let targetWeight = 400;
                    let targetWidth = 100;
                    let targetItal = 0;
                    let targetAlpha = 1;

                    if (isHovering && chars[i] !== ' ') {
                        const rect = span.getBoundingClientRect();
                        const charCenter = {
                            x: rect.x + rect.width / 2,
                            y: rect.y + rect.height / 2,
                        };

                        const d = dist(mouseRef.current, charCenter);

                        const getAttr = (distance: number, minVal: number, maxVal: number) => {
                            const val = maxVal - Math.abs((maxVal * distance) / maxDist);
                            return Math.max(minVal, val + minVal);
                        };

                        targetWidth = width ? Math.floor(getAttr(d, 5, 200)) : 100;
                        targetWeight = weight ? Math.floor(getAttr(d, 100, 900)) : 400;
                        targetItal = italic ? getAttr(d, 0, 1) : 0;
                        targetAlpha = alpha ? getAttr(d, 0, 1) : 1;
                    }

                    const easeSpeed = 0.08;
                    current.weight += (targetWeight - current.weight) * easeSpeed;
                    current.width += (targetWidth - current.width) * easeSpeed;
                    current.ital += (targetItal - current.ital) * easeSpeed;
                    current.alpha += (targetAlpha - current.alpha) * easeSpeed;

                    span.style.opacity = current.alpha.toString();
                    span.style.fontVariationSettings = `'wght' ${Math.floor(current.weight)}, 'wdth' ${Math.floor(current.width)}, 'ital' ${current.ital.toFixed(2)}`;
                });
            }

            rafId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(rafId);
    }, [width, weight, italic, alpha, chars.length, isHovering]);


    return (
        <div
            ref={containerRef}
            className="relative w-fit overflow-hidden bg-transparent"
            style={{
                padding: 0,
                margin: 0,
                width: 'fit-content',
                height: 'fit-content'
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => onClick ? onClick() : undefined }
        >
            <style>{`
                @import url('${fontUrl}');
                .stroke span {
                  position: relative;
                  color: ${textColor};
                }
                .stroke span::after {
                  content: attr(data-char);
                  position: absolute;
                  left: 0;
                  top: 0;
                  color: transparent;
                  z-index: -1;
                  -webkit-text-stroke-width: ${strokeWidth}px;
                  -webkit-text-stroke-color: ${strokeColor};
                }
              `}</style>

            <h1
                ref={titleRef}
                className={`text-pressure-title ${stroke ? 'stroke' : ''} uppercase ${className}`}
                style={{
                    fontFamily,
                    fontSize: fontSize,
                    lineHeight: 1,
                    transform: `scale(1, ${scaleY})`,
                    transformOrigin: 'center top',
                    margin: 0,
                    padding: 0,
                    fontWeight: 100,
                    color: stroke ? undefined : textColor,
                    display: 'block',
                    width: 'fit-content',
                    height: 'fit-content',
                }}
            >
                {words.map((word, wordIndex) => (
                    <span key={`word-${wordIndex}`} className="inline-block">
                        {word.split('').map((char, charIndex) => {
                            const globalIndex = words.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0) + charIndex;
                            return (
                                <span
                                    key={`${wordIndex}-${charIndex}`}
                                    ref={(el: any) => (spansRef.current[globalIndex] = el)}
                                    data-char={char}
                                    className="inline-block bold"
                                    style={{
                                        fontSize: `${responsiveSize}rem`,
                                        lineHeight: 1,
                                        padding: 0,
                                        margin: 0,
                                        verticalAlign: 'top',
                                        display: 'inline-block'
                                    }}
                                >
                                    {char}
                                </span>
                            );
                        })}
                        {wordIndex < words.length - 1 && (
                            <span
                                key={`space-${wordIndex}`}
                                ref={(el: any) => {
                                    const spaceIndex = words.slice(0, wordIndex + 1).join(' ').length;
                                    spansRef.current[spaceIndex] = el;
                                }}
                                data-char=" "
                                className="inline-block bold"
                                style={{
                                    fontSize: `${responsiveSize}rem`,
                                    lineHeight: 1,
                                    padding: 0,
                                    margin: 0,
                                    verticalAlign: 'top',
                                    display: 'inline-block'
                                }}
                            >
                                &nbsp;
                            </span>
                        )}
                    </span>
                ))}
            </h1>
        </div>
    );
}

export default PressureText;