import React, {useState, useEffect, useRef} from "react";

const EXPERTISE_DATA = [
    {
        title: "Fullstack Web Development",
        description: "Fullstack has been at the core of my workings with modern APIs and frameworks, using React and other technologies",
        graphic: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="20" width="60" height="80" fill="#fff" opacity="0.3"/>
            <rect x="90" y="40" width="60" height="100" fill="#fff" opacity="0.5"/>
            <rect x="160" y="30" width="20" height="120" fill="#fff" opacity="0.4"/>
            <circle cx="50" cy="160" r="30" fill="#fff" opacity="0.3"/>
            <polygon points="120,150 140,180 100,180" fill="#fff" opacity="0.35"/>
        </svg>`
    },
    {
        title: "Data Intensive Applications",
        description: "Using data to mediate and preview in all of the applications built",
        graphic: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="180" x2="20" y2="20" stroke="#fff" stroke-width="2" opacity="0.4"/>
            <line x1="20" y1="180" x2="180" y2="180" stroke="#fff" stroke-width="2" opacity="0.4"/>
            <polyline points="20,160 50,120 80,140 110,80 140,100 170,40" fill="none" stroke="#fff" stroke-width="3" opacity="0.5"/>
            <circle cx="20" cy="160" r="4" fill="#fff" opacity="0.6"/>
            <circle cx="50" cy="120" r="4" fill="#fff" opacity="0.6"/>
            <circle cx="80" cy="140" r="4" fill="#fff" opacity="0.6"/>
            <circle cx="110" cy="80" r="4" fill="#fff" opacity="0.6"/>
            <circle cx="140" cy="100" r="4" fill="#fff" opacity="0.6"/>
            <circle cx="170" cy="40" r="4" fill="#fff" opacity="0.6"/>
        </svg>`
    },
    {
        title: "Computer Graphics and Computational Geometry",
        description: "Computer graphics using low-level graphic APIs and game engines",
        graphic: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <polygon points="100,20 180,180 20,180" fill="#fff" opacity="0.3"/>
            <circle cx="100" cy="100" r="40" fill="none" stroke="#fff" stroke-width="3" opacity="0.4"/>
            <rect x="70" y="70" width="60" height="60" fill="none" stroke="#fff" stroke-width="2" opacity="0.5" transform="rotate(45 100 100)"/>
        </svg>`
    }
];

const ExpertiseSection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [activeExpertiseIndex, setActiveExpertiseIndex] = useState<number>(0);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateCanvasSize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            drawSVGToCanvas();
        };

        const drawSVGToCanvas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const svgString = EXPERTISE_DATA[activeExpertiseIndex].graphic;

            const img = new Image();
            const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);

            img.onload = () => {
                const scale = Math.min(canvas.width / 200, canvas.height / 200) * 0.8;
                const scaledWidth = 200 * scale;
                const scaledHeight = 200 * scale;

                const x = canvas.width - scaledWidth;
                const y = canvas.height - scaledHeight;

                ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
                URL.revokeObjectURL(url);
            };

            img.src = url;
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        return () => window.removeEventListener('resize', updateCanvasSize);
    }, [activeExpertiseIndex]);

    return (
        <section data-tag={"expertise-section"}
                 className='relative m-0 p-0'>
            <h3 className="text-2xl font-light">Expertise</h3>

            {/* Expertise Window */}
            <div className={"border border-neutral-500 rounded-lg h-[450px] p-4 mt-4 flex flex-col gap-6"}>
                <ul className={"flex gap-4"}>
                    <li className={`text-[0.75rem] p-2 border border-neutral-500 rounded-sm hover:bg-white/20 cursor-pointer
                    ${activeExpertiseIndex == 0 && "bg-white/20"}`}
                        onClick={() => {setActiveExpertiseIndex(0);}}
                    >fullstack web development
                    </li>
                    <li className={`text-[0.75rem] p-2 border border-neutral-500 rounded-sm hover:bg-white/20 cursor-pointer
                        ${activeExpertiseIndex == 1 && "bg-white/20"}`}
                        onClick={() => {
                            setActiveExpertiseIndex(1);
                        }}
                    >data-intensive applications
                    </li>
                    <li className={`text-[0.75rem] p-2 border border-neutral-500 rounded-sm hover:bg-white/20 cursor-pointer
                        ${activeExpertiseIndex == 2 && "bg-white/20"}`}
                        onClick={() => {
                            setActiveExpertiseIndex(2);
                        }}
                    >computer graphics
                    </li>
                </ul>

                <div className={"relative w-full h-full"}>
                    <canvas ref={canvasRef} className={"absolute top-0 w-full h-full bg-transparent"}/>

                    <div className={"relative flex flex-col gap-2 w-1/2"}>
                        <h3 className={"font-bold text-2xl"}>{EXPERTISE_DATA[activeExpertiseIndex].title}</h3>
                        <p className={""}>{EXPERTISE_DATA[activeExpertiseIndex].description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExpertiseSection;

