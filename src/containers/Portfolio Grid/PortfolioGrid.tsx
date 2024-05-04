import './PortfolioGrid.scss';

import {useGlobalContext} from "../../utils/context.tsx";
import {projects} from '../../utils/constants.ts'

import InfoCard from "../../components/InfoCard/InfoCard.tsx";
import PortfolioGridEntry from "../../components/PortfolioGridEntry/PortfolioGridEntry.tsx";

const PortfolioGrid = () => {

    const {globalData} = useGlobalContext();

    return (
        <div className="portfolio-grid-container">
            {
                projects.map((project,index) => (
                    <PortfolioGridEntry
                        key={index}
                        title={project.title}
                        year={project.year}
                        type={project.type}
                        role={project.role}
                        imagePath={project.imagePath}
                        url={project.url}
                    />
                ))
            }

            <InfoCard project={globalData.project} />
        </div>
    );
};

export default PortfolioGrid;
