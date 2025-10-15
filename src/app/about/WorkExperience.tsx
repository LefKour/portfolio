
type Role = {
    title: string;
    location: string;
    company: string;
    duration: string;
    description: string;
    type: "practice" | "academic";
    tags: string[]
}

const PROFESSIONAL_ROLES : Role[] = [
    // Practice
    {
        title : "Software Development Engineer",
        location: "Barcelona, Spain (Remote)",
        company: "McNeel Europe | Barcelona Spain",
        duration: "September 2023 - Currently",
        description: "Managing the software integration of the research project “Rhino.Ecologic”, funded by the Horizon 2020 program.",
        type: "practice",
        tags : ["C#", "C++", "Python", "TypeScript", ".NET", "OpenGL", "Node.js", "Scikit Learn", "MongoDB", "SQLite"]
    },
    {
        title : "Software Developer | Design Systems Analyst",
        location: "London, United Kingdom",
        company: "Foster + Partners",
        duration: "May 2023 - Currently",
        description: "Member of the applied research and development team. Developing in-house applications for immersive media (XR), Metaverse and digital twin initiatives.",
        type: "practice",
        tags : ["C#", "C++", "Python", "TypeScript", ".NET", "Next.js", "Microsoft Azure", "Unity", "Unreal Engine", "Omniverse"]
    },
    {
        title : "Applications Developer",
        location: "London, United Kingdom",
        company: "Grimshaw Architects",
        duration: "August 2022 - May 2023",
        description: "Member of the Design Technology (DT) department. Led and coordinated global software development projects and initiatives. Developed standalone, " +
            "integrated (plug-ins) and web-based applications for sustainability and design automation purposes.",
        type: "practice",
        tags : ["C#", "Python", "HTML/CSS/JavaScript", "WPF", ".NET", "Pandas", "NLTK", "Unity"]
    },
    {
        title : "Computational Design Assistant",
        location: "London, United Kingdom",
        company: "Grimshaw Architects",
        duration: "November 2021 - August 2022",
        description: "Provided complex geometry and data-driven design solutions to architectural projects. Developed Grimshaw’s Metaverse project and interoperability application for collaborative design.",
        type: "practice",
        tags : ["C#", ".NET", "WPF", "Unity", "Grasshopper"]
    },
    {
        title : "Digital Platforms Assistant",
        location: "London, United Kingdom",
        company: "Architectural Association",
        duration: "September 2020 - September 2021",
        description: "Aided in the setup and maintenance efforts of the school’s websites. ",
        type: "practice",
        tags : []
    },

    // Academic
    {
        title : "Associate Data Science + AI Lecturer",
        location: "London, United Kingdom",
        company: "University of the Arts London (UAL), Creative Computing Institute",
        duration: "September 2023 - Currently",
        description: "Structured the curriculum of units in the BSc and MSc in Data Science and AI courses.Delivering" +
            " lectures on database systems (hybrid and cloud), data pipelines and full-stack web development.",
        type: "academic",
        tags : []
    },
    {
        title : "Visiting Lecturer and Course Advisor",
        location: "Canterbury, United Kingdom",
        company: "University for the Creative Arts (UCA)",
        duration: "November 2023 - Currently",
        description: "Providing mentoring and guidance for the delivery of computational design courses and attending juries as a juror.",
        type: "academic",
        tags : []
    },
    {
        title : "Associate Lecturer",
        location: "Canterbury, United Kingdom",
        company: "University for the Creative Arts (UCA)",
        duration: "January 2024 - November 2023",
        description: "Taught a unit on computational design and fabrication.",
        type: "academic",
        tags : []
    },
    {
        title : "Visiting Tutor",
        location: "London, United Kingdom",
        company: "University of Westminster",
        duration: "July 2022",
        description: "Delivered a workshop on computational analysis and XR for design.",
        type: "academic",
        tags : []
    },
]

const ProfessionalExperienceBlock = ({ role }: {role: Role}) => {
    return (
        <div className={"relative flex flex-col gap-2"}>
            <h5 className={"font-medium text-neutral-400"}>{role.company} · <span className={"font-light"}>{role.location}</span></h5>
            <h4 className={"text-2xl font-bold"}>{role.title}</h4>
            <h5 className={"text-neutral-300"}>{role.duration}</h5>

            {/*Description*/}
            <p className={""}>{role.description}</p>

            {/*Tags*/}
            {role.tags.length > 0 && <div className={"flex flex-wrap gap-2 mt-4 md:mt-8"}>
                {role.tags.map((tag, i) => (
                    <div key={i} className={"relative p-2 border border-neutral-500 text-neutral-300 rounded-sm hover:bg-white/20 transition cursor-pointer"}>
                        {tag}
                    </div>
                ))}
            </div>}
    </div>
    )};

const WorkExperience = () => {
    return (
        <section className={"flex flex-col gap-4"}>
            <div className={"flex flex-col sticky"}>
                <h3 className={"text-2xl lowercase font-bold"}>Work Experience</h3>
                <h4 className={""}>practice</h4>
            </div>

            {/* Practice */}
            <div className={"flex flex-col mt-8 gap-20 md:gap-10"}>
                {PROFESSIONAL_ROLES.filter(r => r.type === "practice").map((r, i) => (
                    <ProfessionalExperienceBlock key={i} role={r} />
                ))}
            </div>

            {/* Academic */}
            <h4 className={"mt-15"}>academic</h4>
            <div className={"flex flex-col gap-10"}>
                {PROFESSIONAL_ROLES.filter(r => r.type === "academic").map((r, i) => (
                    <ProfessionalExperienceBlock key={i} role={r} />
                ))}
            </div>
        </section>
    );
}

export default WorkExperience;