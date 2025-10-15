import { useDeviceDetection } from "@/lib/hooks";

type Talk = {
    title: string;
    venue: string;
    date: string;
    url: string;
}

const TALKS : Talk[] = [
    {
        title: "Developing Volumetric Data Models for ML Training Datasets Using Grasshopper",
        venue: "Journal of Digital Landscape Architecture (DLA)",
        date: "2025",
        url: "https://gispoint.de/gisopen-paper/8395-developing-volumetric-data-models-for-ml-training-datasets-using-grasshopper.html?IDjournalTitle=6&cHash=a61907bf26c28fde2dfbb235c83035fe"
    },
    {
        title: "Integrating Ecological Modeling into the 3D CAD System Rhinoceros",
        venue: "Journal of Digital Landscape Architecture (DLA)",
        date: "2025",
        url: "https://gispoint.de/gisopen-paper/8396-integrating-ecological-modeling-into-the-3d-cad-system-rhinoceros.html?IDjournalTitle=6&cHash=a61907bf26c28fde2dfbb235c83035fe"
    }
]

const Talk = ({talk} : {talk : Talk}) => {
    const { isMobile } = useDeviceDetection();

    return (
        <div className={"flex justify-between items-center"}>
            <h5 className={"text-lg font-medium"}>{talk.title}, {talk.date}</h5>
            { !isMobile && <button className={"inline border border-neutral-300 p-2 rounded cursor-pointer hover:font-bold hover:bg-white/20"}
                    onClick={() => {window.open(talk.url)}}>visit</button> }
        </div>
    );
};

const Talks = () => {
    return (
        <section className={""}>
            <h3 className={"text-2xl font-bold mb-10 lowercase"}>Talks</h3>
            <div className={"flex flex-col gap-4"}>
                {TALKS.length > 0 && TALKS.map((t, i) => <Talk key={i} talk={t}/>)}
            </div>
        </section>
    );
}

export default Talks;