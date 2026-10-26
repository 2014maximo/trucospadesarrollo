export type TechnologyCategory = 'frontend' | 'mobile' | 'backend' | 'tools';

export interface ITechnology {
    name: string;
    srcImg: string;
    category: TechnologyCategory;
    color: string;
}

export interface ITechnologyGroup {
    category: TechnologyCategory;
    label: string;
}
