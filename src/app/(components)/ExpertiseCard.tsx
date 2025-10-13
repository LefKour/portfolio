import {ReactNode} from "react";

interface ExpertiseCardProps {
    index : number,
    children: ReactNode
}

const ExpertiseCard = ({
                            index,
                            children
                       }: ExpertiseCardProps) => {


    return (
        <div
            className={"w-full h-full bg-gradient-to-br from-white/50 to-neutral-400/20 backdrop-blur border rounded-xl flex flex-col gap-2  justify-end p-5"}>
            <div className={"w-[1px] h-full mb-10 bg-white"}/>
            <h3 className={"relative text-xl rounded-full border pl-5 pt-2 pb-2 "}>Expertise {index}</h3>
            {children}
        </div>)
        ;
};

export default ExpertiseCard;