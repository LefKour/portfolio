import React, {useState, useEffect, useRef} from "react";
import { useDeviceDetection } from "@/lib/hooks";
import { useLoadingContext } from "@/lib/hooks/useLoadingContext";
import { useRouter } from "next/navigation";

const POSITION_DATA = [
    {
        title: "Design Systems Analyst",
        company: "Foster + Partners | London, United Kingdom",
        duration: "May 2023 - Currently",
        description: "As a design systems analyst at the Applied R+D department of Foster + Partners, I’ve been handling data " +
            "in the context of immersive applications, using game engines and graphical post-process analysis.",
        tags: [
            "data analysis", "xr", "game engines", "web development"
        ]
    },
    {
        title: "Software Development Engineer",
        company: "McNeel",
        duration: "Sep. 2023 - Currently",
        description: "Conducting research in the area of computational design. ",
        tags: [
            "computer graphics", "computational geometry", "data analysis", "computational simulation"
        ]
    },
    {
        title: "Data Science + AI Lecturer",
        company: "University of the Arts London (UAL)",
        duration: "2023 - Currently",
        description: "Teaching students software development with for data-intensive applications with the mediation of ML.",
        tags: [
            "data analysis", "fullstack web development"
        ]
    }
]

const EngagementSection = () => {
    const { isMobile } = useDeviceDetection();
    const { isLoading } = useLoadingContext();

    const router = useRouter();

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [positionIndex, setPositionIndex] = useState<number>(0);

    useEffect(() => {

    }, []);

    return (
        <section data-tag={"engagement-section"}
                 className='relative m-0 p-0 mb-10'>
            <h3 className="text-2xl font-light">Engagement</h3>

            {/* Positions */}
            <div className="rounded-lg md:p-4 mt-4 flex flex-col gap-4 min-h-100">
                <div className={`relative rounded-lg md:p-4 flex ${isMobile && "flex-wrap"} md:flex-row gap-2 md:gap-4`}>
                    { !isMobile && <div className={"absolute h-[1px] w-[68%] bg-white left-[50%] translate-x-[-50%] mt-2"}/>}

                    <div className="flex flex-col items-center">
                        { !isMobile &&  <div className="bg-white w-5 h-5 rounded-full"/> }
                        <div className={`md:m-4 border border-white rounded-lg p-2 cursor-pointer transition text-[0.75rem] md:text-lg
                            hover:bg-linear-45 from-[#F6F6F6]/20 via-[#635F5F] to-[#EDEDED]/20
                            ${positionIndex == 0 && "bg-linear-45"}`}
                             onClick={() => {
                                 setPositionIndex(0)
                             }}>
                            <p className={"text-center"}>Design Systems Analyst</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        { !isMobile &&  <div className="bg-white w-5 h-5 rounded-full"/> }
                        <div className={`md:m-4 border border-white rounded-lg p-2 cursor-pointer transition text-[0.75rem] md:text-lg
                            hover:bg-linear-45 from-[#F6F6F6]/20 via-[#635F5F] to-[#EDEDED]/20
                            ${positionIndex == 1 && "bg-linear-45"}`}
                             onClick={() => {
                                 setPositionIndex(1)
                             }}>
                            <p className={"text-center"}>Software Development Engineer</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        { !isMobile &&  <div className="bg-white w-5 h-5 rounded-full"/> }
                        <div className={`md:m-4 border border-white rounded-lg p-2 cursor-pointer transition text-[0.75rem] md:text-lg
                            hover:bg-linear-45 from-[#F6F6F6]/20 via-[#635F5F] to-[#EDEDED]/20
                            ${positionIndex == 2 && "bg-linear-45"}`}
                             onClick={() => {
                                 setPositionIndex(2)
                             }}>
                            <p className={"text-center"}>Data Science + AI Lecturer</p>
                        </div>
                    </div>
                </div>

                <div className={"h-full w-full flex flex-col md:flex-row gap-4"}>
                    {/*Position Overview*/}
                    <div className={"w-full md:w-1/3 flex flex-col gap-2"}>
                        <div className={"p-4 border border-neutral-500 rounded-lg"}>
                            <h3 className={"font-bold text-lg"}>{POSITION_DATA[positionIndex].title}</h3>
                            <p className={"text-neutral-400 text-sm"}>{POSITION_DATA[positionIndex].company}</p>
                            <p className={"text-neutral-400 text-sm"}>{POSITION_DATA[positionIndex].duration}</p>
                        </div>

                        { !isMobile &&<button className={"self-end inline  text-right border border-neutral-500 p-2 rounded-lg" +
                            " hover:bg-white/20 transition cursor-pointer"}
                                onClick={() => {router.push("/about")}}
                        >
                            see more
                        </button>}
                    </div>

                    {/*Description*/}
                    <div className={"relative w-full md:w-2/3 border border-neutral-500 rounded-lg p-4 flex flex-col gap-10"}>
                        <p className={"text-sm font-light text-wrap h-full"}>{POSITION_DATA[positionIndex].description}</p>

                        <div className={"flex flex-col gap-2"}>
                            <label className={"text-sm text-neutral-300"}>tags:</label>
                            <div className={"flex flex-wrap gap-2"}>
                                {POSITION_DATA[positionIndex].tags.map((item, index) => {
                                    return <label key={index} className={"font-light text-sm p-2 border border-neutral-500 rounded-lg bg-white/20"} >{item}</label>
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default EngagementSection;

