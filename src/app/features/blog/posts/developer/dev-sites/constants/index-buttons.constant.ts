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
            },
            {
                title: 'PAPERME', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Plantillas de papel con muchos diseños exportables a PDF.', url: 'https://paperme.pixzens.com/es'
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
                title: 'Spline', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Plataforma de diseño 3D y de todo un poquito para desarrollo web.', url: 'https://spline.design/'
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
                title: 'Recoded:88', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Juegos online de las consolas retro, evita instalar emuladores solo juega y listo. Nes, Snes, Sega Genesis, Nintendo 64, NeoGeo, Playstation, Game boy, Game boy advance y Nintendo DS', url: 'https://rec0ded88.com/'
            },
            {
                title: 'Repositorio con código fuente de juegos reconocidos', ImgSlider: {
                    alt: '', src: 'cons/xbox.png', height: 0, width: 0
                }, description: 'Repositorio Github con versiones de juegos como Doom, Mario 64, para jugar o analizar como esta construída su lógica.', url: 'https://github.com/bobeff/open-source-games'
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
            },
            {
                title: 'Sobrief', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Resúmenes de libros.', url: 'https://sobrief.com/'
            },
            {
                title: 'Welib', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Biblioteca digital de libros. ', url: 'https://welib-public.org/es.html'
            },
            {
                title: 'Open Library', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Al viejo estilo de prestar libros en la biblioteca para devolverlos después. Creas tu cuenta y listo ya tienes acceso al universo de conocimientos. ', url: 'https://openlibrary.org/'
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
                    alt: 'Workface Logo', src: 'assets/img/icons/logo-workface-white.png', height: 90, width: 0
                }, description: 'La mejor opción para crear tu hoja de vida. Totalmente gratuito todo, CV ATS-Friendly.', url: 'https://2014maximo.github.io/workface/home'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'flowcv Logo', src: 'https://plantillas_dev.gitlab.io/styles/assets/icon/flowcv-white.png', height: 60, width: 0
                }, description: 'Plantillas para hojas de vida. Versiones de pago y gratuitas.', url: 'https://flowcv.com/'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'Canva Logo', src: 'https://plantillas_dev.gitlab.io/assets/img/posts/developer/logo-canva.png', height: 50, width: 0
                }, description: 'Herramienta con una inmensa cantidad de utilidades basadas en diseño gráfico en especial la creación de hojas de vida, ahora de la mano de la IA.', url: 'https://2014maximo.github.io/workface/home'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'Novoresume Logo', src: 'https://plantillas_dev.gitlab.io/assets/img/posts/developer/logo-novoresume.png', height: 50, width: 0
                }, description: 'Herramienta online para crear hojas de vida con diseño profesional y todo lo que se pueda requerir hasta un plan premium.', url: 'https://novoresume.com/?noRedirect=true'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'Zeta Logo', src: 'https://plantillas_dev.gitlab.io/assets/img/posts/developer/logo-zety.png', height: 70, width: 0
                }, description: 'Otra herramienta online para crear hojas de vida con diseño profesional y todo lo que se pueda requerir hasta un plan premium.', url: 'https://zety.es/'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'CV Maker Logo', src: 'https://plantillas_dev.gitlab.io/assets/img/posts/developer/logo-cvmaker.png', height: 40, width: 0
                }, description: 'Otra herramienta online para crear hojas de vida con diseño profesional y todo lo que se pueda requerir hasta un plan premium. Con ayuda de IA', url: 'https://www.cvmaker.es/'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'Visual CV Logo', src: 'https://plantillas_dev.gitlab.io/assets/img/posts/developer/logo-visualcv.png', height: 40, width: 0
                }, description: 'Otra herramienta online para crear hojas de vida con diseño profesional y todo lo que se pueda requerir hasta un plan premium. Con ayuda de IA', url: 'https://www.visualcv.com/'
            },
            {
                title: ' ', ImgSlider: {
                    alt: 'Kickresume Logo', src: 'assets/img/icons/logo-kickresume.png', height: 40, width: 0
                }, description: 'Otra herramienta online para crear hojas de vida con diseño profesional y todo lo que se pueda requerir hasta un plan premium. Con ayuda de IA', url: 'https://www.kickresume.com/es/'
            },
        ]
    },
    {
        id: 'trabajo',
        name: 'Trabajo y tele',
        individualStyle: {
            backgroundColor: 'bg-white',
            textColor: 'text-dark',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-1'
        },
        resources: [
            {
                title: 'Accenture', ImgSlider: {
                    alt: '', src: '', height: 60, width: 0
                }, description: 'Empresa de tecnología con una lista grande de servicios dentro de ellos "BÚSQUEDA DE TALENTO". Cloud,Servicio al Cliente, Cyberseguridad, Datos e IA, Ingeniería y Fabricación Digital, Plataformas Empresariales, Tecnología Emergente, Finanzas y Gestión de Riesgos, Proyectos de Capital e Infraestructura, Learning Service, Servicios Gestionados Estratégicos, Marketing y Experiencia, Metaverso, Sales and Commerce, Estrategia, Supply Chain Networks, Sostenibilidad, Talento y Organización, Transformación Tecnológica', url: 'https://www.accenture.com/co-es'
            },
            {
                title: 'Baires', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Trabajos en especial remotos, gestión de talentos.', url: 'https://applicants.bairesdev.com/'
            },
            {
                title: 'Computrabajo', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'No es fuente favorita para búsqueda de empleo en latinoamerica, en ocasiones puede estar por ahí la oportunidad.', url: 'https://co.computrabajo.com/'
            },
            {
                title: 'Chumi Jobs', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Trabajo en empresas de tecnología para latinoamérica', url: 'https://www.chumijobs.com/'
            },
            {
                title: 'Deel', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Nóminas, recursos humanos, informática e inmigración para cada tipo de trabajador.', url: 'https://www.deel.com/es/'
            },
            {
                title: 'Epam', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Trabaja en el equipo de tecnología.', url: 'https://careers.epam.com/en/jobs?'
            },
            {
                title: 'Fast Dolphin', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Contratación remota bilingue y multilingue.', url: 'https://www.fastdolphin.com/'
            },
            {
                title: 'Getonboard', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Comunidad de empleos en startups en latinoamérica.', url: 'https://www.getonbrd.com/'
            },
            {
                title: 'Hoy trabajas', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Trabajos de muchos tipo en Colombia.', url: 'https://hoytrabajas.com/'
            },
            {
                title: 'Indeed', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Busqueda de empleo adaptable a tus preferencias.', url: 'https://co.indeed.com/'
            },
            {
                title: 'Klimbup', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Búsqueda de empleo o empleados según se requiera.', url: 'https://www.klimbup.com/'
            },
            {
                title: 'Klimbup', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Búsqueda de empleo o empleados según se requiera.', url: 'https://www.klimbup.com/'
            },
            {
                title: 'Michael Page', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Búsqueda de empleo por lugares.', url: 'https://www.michaelpage.com.co/'
            },
            {
                title: 'Klimbup', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Búsqueda de empleo o empleados según se requiera.', url: 'https://www.klimbup.com/'
            },
            {
                title: 'Mbc', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Búsqueda de empleo. "Conectan tu talento con el mundo"', url: 'https://mbcgroup.co/'
            },
            {
                title: 'Periferia IT', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Búsqueda de empleo. Oportunidades, crecimiento profesional y emocionantes desafíos diarios.', url: 'https://periferiaitgroup.com/trabaja-con-nosotros/#'
            },
            {
                title: 'Personal Soft', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Descubre vacantes.', url: 'https://www.personalsoft.com/trabaja-con-nosotros/'
            },
            {
                title: 'Si Hay Trabajo', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Oportunidades laborales de acuerdo a las necesidades, empleos temporales, profesionales, independientes, freelance y muchas más...', url: 'https://www.sihaytrabajo.com.co/'
            },
            {
                title: 'GFT', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Buscador de empleos por filtros', url: 'https://jobs.gft.com/'
            },
            {
                title: 'Signify Technology', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Buscador de empleos por filtros', url: 'https://www.signifytechnology.com/jobs/'
            },
            {
                title: 'Solvo', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Encuentra un trabajo que se ajuste a tus sueños.', url: 'https://careers.solvoglobal.com/job-listing/'
            },
            {
                title: 'Solvedex', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Trabajar con los mejores del mundo.', url: 'https://solvedex.homerun.co/'
            },
            {
                title: 'Talentbox', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Encuentra trabajo soñado como...', url: 'https://talentbox.la/'
            },
            {
                title: 'Think US', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Oportunidades increíbles para:', url: 'https://talentbox.la/'
            },
            {
                title: 'Turing', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Encuentra trabajos remotos con cientos de clientes de Turing', url: 'https://developers.turing.com/'
            },
            {
                title: 'TalentPitch', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Tu talento merece un escenario', url: 'https://website.talentpitch.co/'
            },
            {
                title: 'Unosquare', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Busca trabjo por título, lugar en el mundo.', url: 'https://people.unosquare.com/jobs?filter='
            },
            {
                title: 'Working Nomads', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Trabajos totalmente remotos en todo el mundo, especialmente para nómadas digitales.', url: 'https://www.workingnomads.com/jobs'
            },
            {
                title: 'Just Remote', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Trabajos remotos que se adaptan a tu vida.', url: 'https://justremote.co/'
            },
        ]
    },
    {
        id: 'remote',
        name: '+ Trabajo remoto',
        individualStyle: {
            backgroundColor: 'bg-Kotlin',
            textColor: 'text-dark',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-2'
        },
        resources: [
            {
                title: 'Remote co', ImgSlider: {
                    alt: '', src: '', height: 60, width: 0
                }, description: 'Todo sobre el teletrabajo Explora miles de trabajos remotos e híbridos diseñados para ti.', url: 'https://remote.co/'
            },
            {
                title: 'Wellfound', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Descubre que viene despues.', url: 'https://wellfound.com/'
            },
            {
                title: 'Job Board Search', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Diversifica tu búsqueda de empleo o contrata talentos con estos 723 portales de empleo especializados.', url: 'https://jobboardsearch.com/'
            },
            {
                title: 'Toptal', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Toptal es una red exclusiva de los mejores desarrolladores de software, diseñadores, expertos en marketing, consultores de gestión, gerentes de producto y gerentes de proyectos del mundo. Las mejores empresas contratan a los talentos de Toptal para sus proyectos más importantes.', url: 'https://www.toptal.com/'
            },
            {
                title: 'Flexjobs', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Navega y solicita empleos verificados por expertos cerca de ti y de todo el mundo.', url: 'https://www.flexjobs.com/'
            },
            {
                title: 'Himalayas', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'La mejor bolsa de empleo remota y herramientas de búsqueda de empleo con IA.', url: 'https://himalayas.app/'
            },
            {
                title: 'Remote OK', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Aplica a exclusivas ofertas de trabajo remoto.', url: 'https://remoteok.com/'
            },
            {
                title: 'We workremotely', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'La bolsa de trabajo más grande para trabajos remotos.', url: 'https://weworkremotely.com/'
            },

        ]
    },
    {
        id: 'freelancer',
        name: 'Freelancer',
        individualStyle: {
            backgroundColor: 'bg-Kotlin',
            textColor: 'text-dark',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-2'
        },
        resources: [
            {
                title: 'Freelancer', ImgSlider: {
                    alt: '', src: '', height: 60, width: 0
                }, description: 'La más grande para contratación freelancer a nivel mundial. Hablar en inglés es indispensable.', url: 'https://www.freelancer.com/'
            },
            {
                title: 'Freelancermap', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'El hogar del freelancer. De igual forma hablar en ingles es indispensable.', url: 'https://www.freelancermap.com/'
            }
        ]
    },
    {
        id: 'iavisual',
        name: 'IA - DISEÑO',
        individualStyle: {
            backgroundColor: 'bg-Kubernetes',
            textColor: 'text-dark',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-2'
        },
        resources: [
            {
                title: 'Napkin', ImgSlider: {
                    alt: '', src: '', height: 60, width: 0
                }, description: 'Obtén elementos visuales de tu texto Napkin convierte tu texto en elementos visuales para que compartir tus ideas sea rápido y efectivo. Opciones adicionales con pago.', url: 'https://www.napkin.ai/'
            },
            {
                title: 'Apob', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Crear influencers digitales.', url: 'https://apob.ai/es/'
            },
            {
                title: 'Meshy', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Herramienta IA crear modelos 3D con excelentes maneras de aplicación.', url: 'https://www.meshy.ai/'
            },
            {
                title: 'Pixverse', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Edición gráfica con IA. Fotos y videos, desde una videos ya capturado hacer los cambios que se le pidan. Versiones de pago.', url: 'https://app.pixverse.ai/home'
            },
            {
                title: 'MagicHour', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Edición gráfica con IA. Fotos y videos, desde una videos ya capturado hacer los cambios que se le pidan. Versiones de pago.', url: 'https://magichour.ai/'
            },
            {
                title: 'ObjectRemover', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'IA para eliminar objetos de imágenes, algo simple en descripción pero una utilidad muy requerida.', url: 'https://www.objectremover.com/'
            },
            {
                title: 'Zoo Dev', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'IA para crear objetos 3d a partir de una descripción en texto, los modelos se pueden descargar para utilizar.', url: 'https://zoo.dev/signin?callbackUrl=https%3A%2F%2Fapp.zoo.dev'
            },

        ]
    },
    {
        id: 'iatextvox',
        name: 'IA - TEXTO A VOZ',
        individualStyle: {
            backgroundColor: 'bg-Dart',
            textColor: 'text-white',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-2'
        },
        resources: [
            {
                title: 'Speechma', ImgSlider: {
                    alt: '', src: '', height: 60, width: 0
                }, description: 'IA para conversión de texto a voz, te llenan la web de comerciales y propagandas pero es funcional y tiene muchas voces en muchos idiomas.', url: 'https://speechma.com/english'
            },
            {
                title: 'Lovevoice', ImgSlider: {
                    alt: '', src: '', height: 60, width: 0
                }, description: 'IA para conversión de texto a voz, una vez te logueas te aumentan la cantidad de carácteres a 20.000 y tiene muchas voces en muchos idiomas.', url: 'https://lovevoice.ai/'
            },
            {
                title: 'Qwen-3', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Qwen-3 es un modelo de lenguaje grande desarrollado por Alibaba Cloud, especializado en tareas de comprensión y generación de texto y voz.', url: 'https://qwen-3.com/en'
            },
            {
                title: 'LuvVoice', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Texto a voz online a través de IA con versiones de pago.', url: 'https://luvvoice.com/'
            },
            {
                title: 'Minimax', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Texto a voz online a través de IA con versiones de pago.', url: 'https://www.minimax.io/audio/text-to-speech'
            },
            {
                title: 'NaturalReaders', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Texto a voz online a través de IA avatares demasiado virtualizadas, la interfaz esta muy bien desarrolladas y cumple al final. Como todas tiene versiones de pago, hay que patrocinar el negocio.', url: 'https://www.naturalreaders.com/online/'
            }
        ]
    },
    {
        id: 'iageneral',
        name: 'IA - GENERALES',
        individualStyle: {
            backgroundColor: 'bg-Java',
            textColor: 'text-white',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-1'
        },
        resources: [
            {
                title: 'Aifindy', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Directorio de herramientas de inteligencia artificial.', url: 'https://aifindy.com/'
            },
            {
                title: 'Kortix', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Es una herramienta IA, como en especie de grupo de empleados haciendo muchas tareas, adicional se puede integrar con otras aplicaciones para gestionar como el google calendar hacer una investigación y agregar eventos y tareas en el calendario.', url: 'https://www.kortix.com/'
            },
            {
                title: 'ChatLevel', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Automatización de chat de tus redes sociales como whatsapp, facebook, instagram. Integra un promp con la info que quieres que la IA tenga en cuenta para las respuestas.', url: 'https://chatlevel.ai/'
            }
        ]
    },
        {
        id: 'idiomas',
        name: 'IDIOMAS',
        individualStyle: {
            backgroundColor: 'bg-Android',
            textColor: 'text-dark',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-2'
        },
        resources: [
            {
                title: 'Little language lessons', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Una serie de experimentos mini para aprender idiomas con Gemini.', url: 'https://labs.google/lll/en'
            },

        ]
    },
    {
        id: 'archivos',
        name: 'Archivos - gestión de archivos',
        individualStyle: {
            backgroundColor: 'bg-Html',
            textColor: 'text-white',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-2'
        },
        resources: [
            {
                title: 'Toffeeshare', ImgSlider: {
                    alt: '', src: 'https://toffeeshare.com/static/media/logo.42a58a0d.png', height: 60, width: 0
                }, description: 'Una forma de enviar archivos sin limite de tamaño, sin que se queden con tus archivos, de modo peer to peer.', url: 'https://toffeeshare.com/es'
            },
            {
                title: 'Fromsmash', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Una forma de enviar archivos sin pagar ni registrarse.', url: 'https://fromsmash.com/es'
            },
        ]
    },
    {
        id: 'reparacion',
        name: 'Reparación',
        individualStyle: {
            backgroundColor: 'bg-Net',
            textColor: 'text-white',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-2'
        },
        resources: [
            {
                title: 'Ifixit', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Enorme guía de reparación de carros, electrodomésticos, celulares, computadores consolas, etc.', url: 'https://es.ifixit.com/'
            }
        ]
    },
    {
        id: 'musica',
        name: 'Música',
        individualStyle: {
            backgroundColor: 'bg-Linux',
            textColor: 'text-white',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-2'
        },
        resources: [
            {
                title: 'Split My Song', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Herramienta IA para separar pistas de música.', url: 'https://www.splitmysong.com/'
            }
        ]
    },
    {
        id: 'deportes',
        name: 'Deportes',
        individualStyle: {
            backgroundColor: 'bg-White',
            textColor: 'text-dark',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-2'
        },
        resources: [
            {
                title: 'Workout', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Aplicación para crear y seguir planes de ejercicio.', url: 'https://workout.cool/es'
            }
        ]
    },
    {
        id: 'tecnologia',
        name: 'Tecnología',
        individualStyle: {
            backgroundColor: 'bg-Linux',
            textColor: 'text-white',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-1'
        },
        resources: [
            {
                title: 'Diode', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Plataforma de simulación de interfaces en electrónica.', url: 'https://www.withdiode.com/'
            },
            {
                title: 'Wokwi', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Escenarios de electrónica que la virtualización ha traido a la mano para trabajar como no se ubiese imagina hace algún tiempo.', url: 'https://wokwi.com/'
            }
        ]
    },
    {
        id: 'aprendizaje',
        name: 'Aprendizaje',
        individualStyle: {
            backgroundColor: 'bg-Ionic',
            textColor: 'text-white',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-1'
        },
        resources: [
            {
                title: 'ClassCentral', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Simplemente brutal. En lo que tiene que ver con conseguir las fuentes de gran demanda en cursos y conocimientos, lo recomiendo.', url: 'https://www.classcentral.com/'
            },
            {
                title: 'Claude Code in Action', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Curso de Anthropic con toda la información de las diferentes formas de usar Claude para escribir y refactorizar código.', url: 'https://anthropic.skilljar.com/claude-code-in-action'
            },
            {
                title: 'Mindluster', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Aprende lo que necesites con cursos y muchos otros contenidos.', url: 'https://www.mindluster.com/'
            },
            {
                title: 'Labpsi', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Ejercicios Cognitivos y de memoria.', url: 'https://labpsi.mdp.edu.ar/Home/TipoTest/4?descripcion=Ejercicios%20Cognitivos'
            },
            {
                title: 'StudyFlash', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Ayuda de estudio en los exámenes.', url: 'https://studyflash.ai/es'
            },
        ]
    },
    {
        id: 'mapas',
        name: 'Mapas',
        individualStyle: {
            backgroundColor: 'bg-Javascript',
            textColor: 'text-white',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-1'
        },
        resources: [
            {
                title: 'TopoExport', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Selecciona un área y descarga sus datos en varios formatos y vistas 2d y 3d, versiones de pago.', url: 'https://app.topoexport.com/'
            },
        ]
    },
    {
        id: 'interesante',
        name: 'Interesante',
        individualStyle: {
            backgroundColor: 'bg-Javascript',
            textColor: 'text-white',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-1'
        },
        resources: [
            {
                title: 'Tastedive', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Página web de las recomendaciones, o relacionados o similares. Solo es buscar un libro, una película o un juegos, por nombre o por artista, te entrega algo muy útil en una lista de recomendados. Bastante práctico cuando eres amante de un género específico.', url: 'https://tastedive.com/'
            },
        ]
    },
    {
        id: 'gastronomia',
        name: 'Gastronomía',
        individualStyle: {
            backgroundColor: 'bg-Javascript',
            textColor: 'text-white',
            fontFamily: 'fuenteSeis',
            fontSize: 'fs-30',
            rotation: 'rot-1'
        },
        resources: [
            {
                title: 'Supercook', ImgSlider: {
                    alt: '', src: '', height: 0, width: 0
                }, description: 'Si tienes algunos ingredientes, Supercook te ayuda a crear recetas. .', url: 'https://www.supercook.com/#/desktop'
            },
        ]
    },

];