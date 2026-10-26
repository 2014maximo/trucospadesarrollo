import { ITechnology, ITechnologyGroup } from "../models/technology.model";

const LOGOS = 'assets/img/portfolio/logos/';

export const TECHNOLOGY_GROUPS: ITechnologyGroup[] = [
    { category: 'frontend', label: 'SKILLS.frontend' },
    { category: 'mobile', label: 'SKILLS.movil' },
    { category: 'backend', label: 'SKILLS.backend' },
    { category: 'tools', label: 'SKILLS.herramientas' }
];

export const TECHNOLOGIES: ITechnology[] = [
    { name: 'HTML', srcImg: `${LOGOS}html-white.png`, category: 'frontend', color: '#e34f26' },
    { name: 'CSS', srcImg: `${LOGOS}css.png`, category: 'frontend', color: '#2965f1' },
    { name: 'JavaScript', srcImg: `${LOGOS}javascript.png`, category: 'frontend', color: '#f7df1e' },
    { name: 'Angular', srcImg: `${LOGOS}angular.png`, category: 'frontend', color: '#dd0031' },
    { name: 'RxJS', srcImg: `${LOGOS}RXJS.png`, category: 'frontend', color: '#e535ab' },
    { name: 'Redux', srcImg: `${LOGOS}redux.png`, category: 'frontend', color: '#764abc' },
    { name: 'PrimeNG', srcImg: `${LOGOS}primeng.png`, category: 'frontend', color: '#dd0031' },
    { name: 'Ionic', srcImg: `${LOGOS}ionic.png`, category: 'mobile', color: '#3880ff' },
    { name: 'Flutter', srcImg: `${LOGOS}flutter_text_white.png`, category: 'mobile', color: '#02569b' },
    { name: 'Node.js', srcImg: `${LOGOS}Node.js_logo_black.png`, category: 'backend', color: '#5fa04e' },
    { name: 'PHP', srcImg: `${LOGOS}php.png`, category: 'backend', color: '#777bb4' },
    { name: 'SQL', srcImg: `${LOGOS}sql.png`, category: 'backend', color: '#0078d4' },
    { name: 'Firebase', srcImg: `${LOGOS}Firebase-Logo.png`, category: 'backend', color: '#ffca28' },
    { name: 'Git', srcImg: `${LOGOS}git-light.png`, category: 'tools', color: '#f05032' },
    { name: 'WordPress', srcImg: `${LOGOS}wordpress2.png`, category: 'tools', color: '#21759b' }
];
