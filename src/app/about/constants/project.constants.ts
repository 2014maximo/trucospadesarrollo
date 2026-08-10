import { IProject } from "../models/project.model";

export const PROJECTS: IProject[] = [
    {
        title: 'Trucospadesarrollo',
        description: 'dTrucos',
        technologies: ['Angular Universal', 'Api Headless WordPress', 'GraphQL'],
        githubUrl: 'https://github.com/2014maximo/trucospadesarrollo',
        demoUrl: 'https://www.trucospadesarrollo.com/',
        imageUrl: '',
        features: [
            'fSeo',
            'fTresIdiomas',
            'fContenidoAct',
            'fRss',
            'fModoOscuro',
            'fTiempoLectura',
            'fComentarios',
            'fSitemap',
            'fPwa'
        ]
    },
    {
        title: 'Workface',
        description: 'dWorface',
        technologies: ['Firebase', 'Angular', 'CSS', 'html-to-image', 'Github pages'],
        githubUrl: 'https://github.com/2014maximo/workface',
        demoUrl: 'https://2014maximo.github.io/workface/home',
        imageUrl: '',
        features: [
            'aFiresAuth',
            'eFirestore',
            'gImagenes',
            'inAngular',
            'fExportPdf',
            'fPlantillasCv',
            'fModoOscuro',
            'fHistorialCv',
            'fCompartirLink'
        ]
    },
    {
        title: 'Auralash',
        description: 'dAuralash',
        technologies: ['Astro', 'Tailwind', 'Github pages'],
        githubUrl: 'https://github.com/2014maximo/auralash',
        demoUrl: 'https://2014maximo.github.io/auralash/',
        imageUrl: '',
        features: [
            'fSeo',
            'fResponsive',
            'fFormContacto',
            'fIntegracionRedes',
            'fViewTransitions',
            'fLighthouse100'
        ]
    },
    {
        title: 'Linkpark',
        description: 'dLinkpark',
        technologies: ['Astro', 'Tailwind', 'Github pages'],
        githubUrl: 'https://github.com/2014maximo/linkpark',
        demoUrl: 'https://2014maximo.github.io/linkpark/',
        imageUrl: '',
        features: [
            'fDragDrop',
            'fResponsive',
            'fTemplates',
            'fAnaliticas',
            'fPersonalizacion',
            'fQrCode',
            'fCategorias'
        ]
    }
];
