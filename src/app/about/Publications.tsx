type Publication = {
    title: string;
    journal: string;
    date: string;
    authors: string[];
    journalData: string;
    url: string;
}

const PUBLICATIONS : Publication[] = [
    {
        title: "Developing Volumetric Data Models for ML Training Datasets Using Grasshopper",
        journal: "Journal of Digital Landscape Architecture (DLA)",
        date: "2025",
        authors: ["V. Vogler", "E. Kourkopoulos", "J. Joschinski", "K. Eckelt"],
        journalData: "vol. 10, pp. 1-13, 2025. doi:10.14627/537754010",
        url: "https://gispoint.de/gisopen-paper/8395-developing-volumetric-data-models-for-ml-training-datasets-using-grasshopper.html?IDjournalTitle=6&cHash=a61907bf26c28fde2dfbb235c83035fe"
    },
    {
        title: "Integrating Ecological Modeling into the 3D CAD System Rhinoceros",
        journal: "Journal of Digital Landscape Architecture (DLA)",
        date: "2025",
        authors: ["V. Vogler", "E. Kourkopoulos", "L. Fraguada", "A. Mimet", "J. Joschinski"],
        journalData: "vol. 10, pp. 1-12, 2025. doi:10.14627/537754009",
        url: "https://gispoint.de/gisopen-paper/8396-integrating-ecological-modeling-into-the-3d-cad-system-rhinoceros.html?IDjournalTitle=6&cHash=a61907bf26c28fde2dfbb235c83035fe"
    }
]

const Publication = ({publication} : {publication : Publication}) => {
      return (
          <div className={"flex flex-col gap-0"}>
              <h5 className={"font-light text-neutral-300 text-md mb-2"}>{publication.date}, {publication.journal}</h5>
              <div className={"flex justify-between items-center gap-2"}>
                  <h3 className={"font-medium text-lg"}>{publication.title}</h3>
                  <button
                      className={"inline border border-neutral-300 p-2 rounded cursor-pointer hover:font-bold hover:bg-white/20"}
                      onClick={() => {
                          window.open(publication.url)
                      }}>visit
                  </button>
              </div>
              <div className={"text-wrap"}>
                  <h5 className={"font-light text-neutral-300 text-md mb-2 italic"}>{publication.authors.join(", ")}</h5>
                  <h5 className={"font-light text-neutral-300 text-md mb-2"}>{publication.journalData}</h5>
              </div>
          </div>
      );
};

const Publications = () => {
    return (
        <section className={""}>
            <h3 className={"text-2xl font-bold mb-10 lowercase"}>Publications</h3>
            <div className={"flex flex-col gap-8"}>
                {PUBLICATIONS.length > 0 && PUBLICATIONS.map((p, i) => <Publication key={i} publication={p}/>)}
            </div>
        </section>
    );
}

export default Publications;