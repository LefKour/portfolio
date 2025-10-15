'use client'
import {useDeviceDetection} from "@/lib/hooks";

type Project = {
    title: string;
    type: "academic" | "professional" | "misc";
    year: string;
    tags: string[];
};

const PROJECTS: Project[] = [
    {
        title: "Pax.World Metaverse",
        type: "professional",
        year: "2022",
        tags: ["tag 1", "tag 2", "tag 3"]
    },
    {
        title: "Re-emerge Pavilion",
        type: "misc",
        year: "2021",
        tags: ["tag 1", "tag 2", "tag 3"]
    },
    {
        title: "Cy-Phy Prolepsis",
        type: "academic",
        year: "2021",
        tags: ["tag 1", "tag 2", "tag 3"]
    },
    {
        title: "Arctic Settlement",
        type: "academic",
        year: "2021",
        tags: ["tag 1", "tag 2", "tag 3"]
    },
    {
        title: "UK Vertiports",
        type: "professional",
        year: "2021",
        tags: ["tag 1", "tag 2", "tag 3"]
    }
];

const Project = ({project} : {project : Project}) => {
    return (
        <div className={"flex gap-4 w-full h-50"}>
            <div className={"flex flex-col gap-2 w-1/2"}>
                <h3 className={"font-medium text-neutral-200 text-3xl"}>{project.title}</h3>
                <h5 className={"font-light text-neutral-300 text-xl"}>{project.type}, {project.year}</h5>
                {project.tags.length > 0 &&  <div className={"flex flex-wrap gap-1"}>
                    {project.tags.map((tag, i) => (
                        <label key={i} className={"p-2 text-neutral-300 border border-neutral-500 text-sm rounded-lg " +
                            "cursor-pointer hover:bg-white/20"}>{tag}</label>
                    ))}
                </div>}
            </div>
            <div className={"relative rounded w-2/3 bg-linear-to-t from-neutral-800 to-neutral-200"} />
        </div>
    );
};

const Projects = () => {
    const {isMobile} = useDeviceDetection();

    return (
        <div className={"flex flex-col gap-35 mb-25"}>

            {/* Banner */}
            <div className="flex flex-col gap-4 items-start">
                <section data-tag={"hero-section"}
                         className='relative flex flex-col items-center p-0 mt-35 text-wrap '>
                    <p className={"w-full text-3xl font-medium text-neutral-400"}>
                        I work at the intersection of data-driven design, computer graphics and data.
                    </p>
                </section>
            </div>

            <div className="flex flex-col gap-4 items-start w-full">
                <h3 className={"text-2xl lowercase"}>Projects</h3>
                <div className="flex flex-col gap-8 items-start w-full">
                    {PROJECTS.length > 0 && PROJECTS.map((p, i) => (
                        <Project key={i} project={p} />
                    ))}
                </div>
            </div>
        </div>);
};

export default Projects;