
type Education = {
    degree: string;
    institution: string;
    location: string;
}

const EDUCATION : Education[] = [
    {
        degree: "M.Sc. in Emergent Technologies and Design",
        institution: "Architectural Association",
        location: "London, United Kingdom"
    },
    {
        degree: "Diploma (M.Arch.) in Architectural Engineering",
        institution: "Aristotle University of Thessaloniki ",
        location: "Thessaloniki, Greece"
    }
]

const EducationItem = ({education} : {education: Education}) => {
  return (
      <div className={"flex flex-col"}>
          <h3 className={"text-xl font-bold"}>{education.degree}</h3>
          <h5 className={"text-lg text-neutral-300 font-light"}>{education.institution} · {education.location}</h5>
      </div>
  );
};


const Education = () => {
    return (
        <section className={"mb-50"}>
            <h3 className={"text-2xl font-bold mb-10 lowercase"}>education</h3>
            <div className={"flex flex-col gap-4"}>
                {EDUCATION.length > 0 && EDUCATION.map((e, i) => <EducationItem key={i} education={e}/>)}
            </div>
        </section>
    );
};

export default Education;