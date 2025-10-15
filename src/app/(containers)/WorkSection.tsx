import React from "react";
import {useRouter} from "next/navigation";

const WorkSection = () => {
    const router = useRouter();

    return <div className={"relative w-full flex"}>

        {/* Text */}
        <div className={"w-full flex flex-col gap-2"}>
            <h3 className={"text-2xl"}>Work Section</h3>
            <p className={"max-w-80 font-light text-neutral-300"}>
                My work spans across different industries and disciplines.
                At the core, data-intensive processes, their processing and representation is integral
                in every asset.
            </p>

            <button className={"self-start mt-6 text-right border border-neutral-500 p-2 rounded-lg" +
                " hover:bg-white/20 transition cursor-pointer"}
                    onClick={() => {
                        router.push("/work")
                    }}
            >
                explore more
            </button>
        </div>

        {/* Grid */}
        <div className={"w-full flex flex-wrap gap-2"}>
            <div className={"w-[175px] h-[175px] rounded-lg flex flex-col gap-2"}>
                <div className={"w-full h-full bg-gradient-to-br from-neutral-100 via-neutral-300 to-white rounded-lg animate-pulse-gradient bg-[length:200%_200%]"}/>
                <div className={"w-full h-full bg-gradient-to-br from-white via-neutral-200 to-neutral-100 rounded-lg animate-pulse-gradient bg-[length:200%_200%]"} style={{animationDelay: '1s'}}/>
            </div>
            <div className={"w-[175px] h-[175px] bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-100 rounded-lg animate-pulse-gradient bg-[length:200%_200%]"} style={{animationDelay: '0.5s'}}/>
            <div className={"w-[175px] h-[175px] bg-gradient-to-br from-neutral-100 via-neutral-300 to-white rounded-lg animate-pulse-gradient bg-[length:200%_200%]"} style={{animationDelay: '1.5s'}}/>
            <div className={"w-[175px] h-[175px] rounded-lg flex flex-wrap gap-2"}>
                <div className={"w-[calc(50%-4px)] h-[calc(50%-4px)] bg-gradient-to-br from-neutral-100 via-neutral-200 to-white rounded-lg animate-pulse-gradient bg-[length:200%_200%]"} style={{animationDelay: '0.25s'}}/>
                <div className={"w-[calc(50%-4px)] h-[calc(50%-4px)] bg-gradient-to-br from-white via-neutral-300 to-neutral-100 rounded-lg animate-pulse-gradient bg-[length:200%_200%]"} style={{animationDelay: '0.75s'}}/>
                <div className={"w-[calc(50%-4px)] h-[calc(50%-4px)] bg-gradient-to-br from-neutral-200 via-neutral-300 to-white rounded-lg animate-pulse-gradient bg-[length:200%_200%]"} style={{animationDelay: '1.25s'}}/>
                <div className={"w-[calc(50%-4px)] h-[calc(50%-4px)] bg-gradient-to-br from-white via-neutral-200 to-neutral-100 rounded-lg animate-pulse-gradient bg-[length:200%_200%]"} style={{animationDelay: '1.75s'}}/>
            </div>
        </div>
    </div>
};

export default WorkSection;