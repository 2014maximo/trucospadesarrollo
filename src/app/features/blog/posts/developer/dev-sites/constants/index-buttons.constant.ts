import { IndexButtonsModel } from "src/app/shared/models/index-buttons.model";

export const INDEX_BUTTONS_DEV_SITES: IndexButtonsModel[] = [
    {
        id: 'googleToolsWeb',
        name: 'Herramientas Google Dev Web',
        individualStyle: {
            backgroundColor: 'bg-Developer',
            textColor: 'text-white',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-3'
        },
        resources: [
            {
                title: ' ', ImgSlider: {
                    alt: 'Google Search Console Logo', src: 'assets/img/icons/googlesearchconsole.png', height: 60, width: 0
                }, description: 'Herramienta para posicionar tu web en Google. Aunque con los análisis de IA, las tendencias parecen tener otro rumbo.', url: 'https://search.google.com/search-console/about'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'Google Cloud Logo', src: 'assets/img/icons/google-adsense.png', height: 100, width: 0
                }, description: 'Muestra anuncios de comercio en tu sitio y google nos paga.', url: 'https://www.google.es/intl/es/adsense/start/'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'Google AI studio Logo', src: 'assets/img/icons/googleaistudio.png', height: 50, width: 0
                }, description: 'Plataforma online de desarrollo con IA, con utilidades como generación de imagenes, generación de video, texto a voz ', url: 'https://aistudio.google.com/'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'Firebase Logo', src: 'assets/img/icons/firebase.png', height: 70, width: 0
                }, description: 'Plataforma de desarrollo backend de Google.', url: 'https://firebase.google.com/'
            }
        ]
    },
    {
        id: 'Templates',
        name: 'Templates',
        individualStyle: {
            backgroundColor: 'bg-Android',
            textColor: 'text-white',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-1'
        },
        resources: [
            {
                title: ' ', ImgSlider: {
                    alt: 'Btemplates Logo', src: 'assets/img/icons/blogger-templates.png', height: 40, width: 0
                }, description: 'Plantillas para blog, ya viejitas y de todo un poquito, hasta buenas.', url: 'https://www.https://btemplates.com/'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'Envato Logo', src: 'assets/img/icons/envato.png', height: 40, width: 0
                }, description: 'Miles de plantillas en multiples formatos, cuando se ponen en venta la creatividad no tiene limites.', url: 'https://elements.envato.com/es/graphic-templates/websites'
            }
        ]
    },
    {
        id: 'optimizationWeb',
        name: 'Optimización Web',
        individualStyle: {
            backgroundColor: 'bg-Electron',
            textColor: 'text-dark',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'post-z'
        },
        resources: [
            {
                title: ' ', ImgSlider: {
                    alt: 'Web Dev Logo', src: 'assets/img/icons/web-dev.png', height: 60, width: 0
                }, description: 'Increíble la cantidad de herramientas en esta web para optimizar webs, aprender y poner a punto tu web.', url: 'https://web.dev/'
            },
            {
                title: 'Pagespeed-insights', ImgSlider: {
                    alt: 'Pagespeed-insights Logo', src: 'assets/img/icons/google-pagespeed-insights.png', height: 50, width: 0
                }, description: 'Optimiza tu web, análisis y recomendaciones de mejora y buenas prácticas.', url: 'https://developers.google.com/speed/pagespeed/insights/?hl=es'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'Pingdom Logo', src: 'assets/img/icons/solarwinds-pingdom.png', height: 70, width: 0
                }, description: 'Análisis web, mira como se comporta tu sitio.', url: 'https://tools.pingdom.com/'
            }
        ]
    },
    {
        id: 'webUtilities',
        name: 'Utilidades Web',
        individualStyle: {
            backgroundColor: 'bg-Dart',
            textColor: 'text-white',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-2'
        },
        resources: [
            {
                title: ' ', ImgSlider: {
                    alt: 'WayBackMachine Logo', src: 'assets/img/icons/waybackmachine.png', height: 70, width: 0
                }, description: 'Páginas web en el tiempo. Recopilación gigantesca de páginas web', url: 'https://web.archive.org/'
            },
            {
                title: 'DigitalOcean', ImgSlider: {
                    alt: 'Figma Logo', src: 'assets/img/icons/csslab.png', height: 0, width: 0
                }, description: 'Infraestructura cloud simple diseñada para desarrolladores y startups.', url: 'https://www.digitalocean.com/'
            },
            {
                title: 'Netlify', ImgSlider: {
                    alt: 'Figma Logo', src: 'assets/img/icons/csslab.png', height: 0, width: 0
                }, description: 'Hosting y automatización para proyectos y sitios web estáticos y serverless.', url: 'https://www.netlify.com/'
            }
        ]
    },
    {
        id: 'devTutorials',
        name: 'Tutoriales para Desarrolladores',
        individualStyle: {
            backgroundColor: 'bg-Linux',
            textColor: 'text-white',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-2'
        },
        resources: [
            {
                title: 'Vercel', ImgSlider: {
                    alt: 'Figma Logo', src: 'assets/img/icons/csslab.png', height: 0, width: 0
                }, description: 'Despliega tu código web rápidamente con la mejor experiencia para desarrolladores.', url: 'https://vercel.com/'
            },
            {
                title: 'DigitalOcean', ImgSlider: {
                    alt: 'Figma Logo', src: 'assets/img/icons/csslab.png', height: 0, width: 0
                }, description: 'Infraestructura cloud simple diseñada para desarrolladores y startups.', url: 'https://www.digitalocean.com/'
            },
            {
                title: 'Netlify', ImgSlider: {
                    alt: 'Figma Logo', src: 'assets/img/icons/csslab.png', height: 0, width: 0
                }, description: 'Hosting y automatización para proyectos y sitios web estáticos y serverless.', url: 'https://www.netlify.com/'
            }
        ]
    },
    {
        id: 'games',
        name: 'Juegos',
        individualStyle: {
            backgroundColor: 'bg-Linux',
            textColor: 'text-white',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-2'
        },
        resources: [
            {
                title: ' ', ImgSlider: {
                    alt: 'Gamestorrents Logo', src: 'assets/img/icons/game-torrens.png', height: 20, width: 0
                }, description: 'Juegos del ayer y algunos nuevos, descarga rooms a través de torrents.', url: 'https://www.gamestorrents.fm/juegos-pc/'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'Nasusstore Logo', src: 'assets/img/icons/nasusstore.webp', height: 170, width: 0
                }, description: 'Productos digitales muy asequibles. Juegos, Suscripciones, Códigos promocionales.', url: 'https://nasusrp.store/'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'Xbox Logo', src: 'assets/img/icons/xbox.png', height: 40, width: 0
                }, description: 'Xbox Official Site, tan simple como lo grande que es.', url: 'https://www.xbox.com/'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'PlayStation Logo', src: 'assets/img/icons/playstation.png', height: 100, width: 0
                }, description: 'PlayStation Official Site, tan simple como lo grande que es y sus exclusivos.', url: 'https://www.playstation.com/'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'Blizzard Logo', src: 'assets/img/icons/blizzard.png', height: 100, width: 0
                }, description: 'Blizzard Official Site.', url: 'https://www.blizzard.com/'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'Epic games Logo', src: 'assets/img/icons/epic-games.png', height: 100, width: 0
                }, description: 'Epic games Official Site.', url: 'https://www.epicgames.com/'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'Steam Logo', src: 'assets/img/icons/steam.png', height: 100, width: 0
                }, description: 'Steam Official Site.', url: 'https://store.steampowered.com/'
            }
        ]
    },
    {
        id: 'libros',
        name: 'Libros',
        individualStyle: {
            backgroundColor: 'bg-Angular',
            textColor: 'text-white',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-3'
        },
        resources: [
            {
                title: ' ', ImgSlider: {
                    alt: 'Zlibrary Logo', src: 'assets/img/icons/zlibrary.png', height: 60, width: 0
                }, description: 'APKs de gestión de la biblioteca zlibrary.', url: 'https://go-to-library.sk/'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'Elejandría Logo', src: 'assets/img/icons/elejandria-new.png', height: 70, width: 0
                }, description: 'Libros de dominio público. Espectaculares libros gratuitos.', url: 'https://www.elejandria.com/'
            }
        ]
    },
    {
        id: 'curriculums',
        name: 'Curriculums',
        individualStyle: {
            backgroundColor: 'bg-Javascript',
            textColor: 'text-dark',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-3'
        },
        resources: [
            {
                title: ' ', ImgSlider: {
                    alt: 'flowcv Logo', src: 'https://plantillas_dev.gitlab.io/styles/assets/icon/flowcv-white.png', height: 60, width: 0
                }, description: 'Plantillas para hojas de vida. Versiones de pago y gratuitas.', url: 'https://flowcv.com/'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'Workface Logo', src: 'assets/img/icons/logo-workface-white.png', height: 90, width: 0
                }, description: 'La mejor opción para crear tu hoja de vida. Totalmente gratuito todo, CV ATS-Friendly.', url: 'https://2014maximo.github.io/workface/home'
            }
        ]
    }

];