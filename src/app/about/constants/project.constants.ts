import { IProject } from "../models/project.model";

export const PROJECTS: IProject[] = [
    {
        title: 'E-commerce Dashboard',
        description: 'dECommerceDashboard',
        technologies: ['Flutter Web', 'Dark', 'Firebase'],
        githubUrl: 'https://github.com/tuUsuario/ecommerce-dashboard',
        demoUrl: 'https://demo-ecommerce-dashboard.com',
        imageUrl: 'assets/img/portfolio/projects/ecommerce-dashboard.png',
        features: [
            'auth',
            'invReal',
            'aVentas',
            'pResponsive'
        ]
    },
    {
        title: 'Workface',
        description: 'dWorface',
        technologies: ['Firebase', 'Angular', 'CSS', 'html-to-image', 'Github pages'],
        githubUrl: 'https://github.com/2014maximo/workface',
        imageUrl: 'https://2014maximo.github.io/workface/assets/img/icons/logo-workface-white.png',
        demoUrl: 'https://2014maximo.github.io/workface/home',
        features: [
            'aFiresAuth',
            'eFirestore',
            'gImagenes',
            'inAngular'
        ]
    },
    {
        title: 'PathPilot',
        description: 'dPathPilot',
        technologies: ['Angular', 'Github pages', 'API de Google Maps'],
        githubUrl: 'https://github.com/tuUsuario/weather-pwa',
        demoUrl: 'https://weather-pwa-demo.com',
        imageUrl: 'assets/img/portfolio/projects/weather-app.png',
        features: [
            'aFiresAuth',
            'interIntui',
            'apiGoogle',
            'VRutas'
        ]
    }
];
