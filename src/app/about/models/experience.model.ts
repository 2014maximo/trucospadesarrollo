import { IStyles } from "./style.model";

export interface IExperience {
    entity: string;
    workPerformed: string;
    dateRange: string;
    place: string;
    knowledgeAcquired: string[];
    styles: IStyles;
}

export interface IEras {
    era: string;
    experience: IExperience[];
}
