import {Project, ProjectType} from "./types.ts";

//#region Image Imports

import metaverse from '../assets/project photos/pax_world_metaserai.png'
import re_emerge_pavilion from '../assets/project photos/re_emerge_pavilion_photo.jpg'
import cy_phy_prolepsis from '../assets/project photos/cyphy_prolepsis.png'
import potentmorph from '../assets/project photos/potentmorph.png'
import hormonergy from '../assets/project photos/hormonergy.png'
import antidesertification_units from '../assets/project photos/antidesertification_units.jpg'
import arctic_settlement from '../assets/project photos/arctic_settlement.jpg'
import uk_vertiports from '../assets/project photos/uk_vertiports.png'

//#endregion Image Imports

export const titles: string[] = [
    'software developer',
    'computational designer',
    'creative coder',
    'xr specialist'
];

export const projects: Project[] = [
    {
        title: "Pax.World Metaserai",
        year: 2022,
        type: ProjectType.Professional,
        role: "Developer",
        imagePath: metaverse,
        url: 'https://www.pax.world/'
    },
    {
        title: "Re-Emerge Pavilion",
        year: 2021,
        type: ProjectType.Academic,
        role: "Computational Designer",
        imagePath: re_emerge_pavilion,
        url: 'https://www.archdaily.com/972425/the-architectural-associations-emtech-and-hassel-design-pavilion-using-reclaimed-timber'
    },
    {
        title: "Cy-Phy Prolepsis",
        year: 2021,
        type: ProjectType.Academic,
        role: "Developer",
        imagePath: cy_phy_prolepsis,
        url: 'https://www.youtube.com/watch?v=hTi8SXT4VVE&t=489s&ab_channel=AAEmTech'
    },
    {
        title: "Potentmorph",
        year: 2020,
        type: ProjectType.Academic,
        role: "Developer",
        imagePath: potentmorph,
        url: null
    },
    {
        title: "Hormonergy",
        year: 2020,
        type: ProjectType.Academic,
        role: "Computational Designer",
        imagePath: hormonergy,
        url: null
    },
    {
        title: "Anti-desertification Units",
        year: 2019,
        type: ProjectType.Academic,
        role: "Designer",
        imagePath: antidesertification_units,
        url: null
    },
    {
        title: "Arctic Settlement",
        year: 2022,
        type: ProjectType.Academic,
        role: "Computational Designer",
        imagePath: arctic_settlement,
        url: null
    },
    {
        title: "UK Vertiports",
        year: 2022,
        type: ProjectType.Professional,
        role: "Computational Designer",
        imagePath: uk_vertiports,
        url: null
    },
];