import Image from 'next/image'
import ProfilePic from "@/assets/profile_pic.jpg";

const Bio = () => {
    return (
        <div className="flex gap-4">
            <Image className={"rounded w-[250px] h-[250px]"} src={ProfilePic} width={250} height={250} alt={"profile picture"}/>

            <div className="flex flex-col gap-2">
                <p className={"font-medium"}>
                    I am a software engineer, researcher, and lecturer working at the intersection of fullstack
                    development, data science, computer graphics, and immersive media. My career has spanned roles in R&D groups,
                    innovation labs, and product development teams, where I have built solutions that bridge
                    cutting-edge technology with practical applications. I have hands-on experience developing software in
                    .NET and modern web frameworks, while also exploring advanced areas such as AI, data analytics, and
                    interactive media.
                </p>

                <p className={""}>
                    My work often sits at the boundary between computation and experience, from building robust
                    data-driven applications to experimenting with immersive technologies that push how we interact with digital
                    environments. This blend of technical depth and creative exploration has enabled me to contribute to
                    projects ranging from enterprise software to experimental platforms in graphics and media.
                </p>

                <p className={""}>
                    Alongside professional practice, I teach and lecture on data science, software engineering,
                    databases, and web technologies. Sharing knowledge and mentoring students is a central part of my work, and I
                    enjoy guiding others to develop both their technical skills and critical thinking about emerging
                    technologies. My focus as both a practitioner and educator is on empowering others to engage with the rapidly
                    evolving landscape of software and immersive systems.
                </p>
            </div>
        </div>);
}

export default Bio;