import { FirstDescriptionBlockModel } from "src/app/shared/models/first-description-block.model";

export const FRONTEND_ROADMAP: FirstDescriptionBlockModel[] = [
    {
        title: {
            title: ['Origin'],
            description: 'DEVELOPER.developer.frontendRoadmap.origen.titulo'
        },
        textBlock: [
            {
                subtitle: ['DEVELOPER.developer.frontendRoadmap.origen.subtitulo'],
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.origen.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25'
                    },
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.origen.text2',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25'
                    },
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.origen.text3',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25'
                    },
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.origen.text4',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25'
                    },
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.origen.text5',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25'
                    },
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.origen.text6',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25'
                    },
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.origen.text7',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25'
                    },
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.origen.text8',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25'
                    }
                ],
                image:
                {
                    src: 'assets/img/persons/Tim.png',
                    alt: 'Tim Berners-Lee',
                    title: 'Tim Berners-Lee',
                    height: '200px',
                    width: 'auto',
                    class: 'rounded-circle mr-3 border'
                }
            }
        ]
    },
    {
        title: {
            title: ['HTML'],
            description: 'DEVELOPER.developer.frontendRoadmap.html.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.html.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25 mb-0'
                    }
                ]
            }
        ],
        referenceContent: [
            {
                title: 'World Wide Web Consortium',
                link: 'https://www.w3.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.cssArchitecture.titulo',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'MDN Web Docs - HTML',
                link: 'https://developer.mozilla.org/es/docs/Web/HTML',
                description: 'DEVELOPER.developer.frontendRoadmap.cssArchitecture.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            }
        ]
    },
    {
        title: {
            title: ['CSS'],
            description: 'DEVELOPER.developer.frontendRoadmap.css.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.css.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25 mb-0'
                    }
                ]
            }
        ],
        referenceContent: [
            {
                title: 'CSSMAKING',
                link: 'https://www.w3.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.css.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'LAYOUTSRESPONSIVE',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.css.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'DESIGN',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.css.descripcionLink3',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
        ]
    },
    {
        title: {
            title: ['CSS Architecture'],
            description: 'DEVELOPER.developer.frontendRoadmap.cssArchitecture.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.cssArchitecture.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25 mb-0'
                    }
                ]
            }
        ],

        referenceContent: [
            {
                title: 'BEM',
                link: 'https://en.bem.info/',
                description: 'DEVELOPER.developer.frontendRoadmap.cssArchitecture.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'SMACSS',
                link: 'https://developer.mozilla.org/es/docs/Web/HTML',
                description: 'DEVELOPER.developer.frontendRoadmap.cssArchitecture.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'OOCSS',
                link: 'https://en.bem.info/',
                description: 'DEVELOPER.developer.frontendRoadmap.cssArchitecture.descripcionLink3',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'ATOMIC DESIGN',
                link: 'https://en.bem.info/',
                description: 'DEVELOPER.developer.frontendRoadmap.cssArchitecture.descripcionLink4',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
        ]
    },
    {
        title: {
            title: ['CSS Preprocessors'],
            description: 'DEVELOPER.developer.frontendRoadmap.cssPreprocessors.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.cssPreprocessors.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25 mb-0'
                    }
                ]
            }
        ],
        referenceContent: [
            {
                title: 'SASS',
                link: 'https://www.w3.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.cssPreprocessors.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'LESS',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.cssPreprocessors.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'STYLUS',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.cssPreprocessors.descripcionLink3',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
        ]
    },
    {
        title: {
            title: ['Javascript'],
            description: 'DEVELOPER.developer.frontendRoadmap.javascript.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.javascript.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25'
                    }
                ]
            }
        ]
    },
    {
        title: {
            title: ['Internet'],
            description: 'DEVELOPER.developer.frontendRoadmap.internet.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.internet.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25'
                    }
                ]
            }
        ]
    },
    {
        title: {
            title: ['Version Control Systems'],
            description: 'DEVELOPER.developer.frontendRoadmap.versionControlSistem.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.versionControlSistem.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25 mb-0'
                    }
                ]
            }
        ],
        referenceContent: [
            {
                title: 'GIT',
                link: 'https://www.w3.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.versionControlSistem.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'SVN',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.versionControlSistem.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'MERCURIAL',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.versionControlSistem.descripcionLink3',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            }
        ]
    },
    {
        title: {
            title: ['VCS Hosting'],
            description: 'DEVELOPER.developer.frontendRoadmap.vcsHosting.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.vcsHosting.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25'
                    }
                ]
            }
        ]
    },
    {
        title: {
            title: ['Package Managers'],
            description: 'DEVELOPER.developer.frontendRoadmap.packageManagers.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.packageManagers.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25'
                    }
                ]
            }
        ]
    },
    {
        title: {
            title: ['Frameworks Frontend'],
            description: 'DEVELOPER.developer.frontendRoadmap.frameworksFrontend.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.frameworksFrontend.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25'
                    }
                ]
            }
        ]
    },
    {
        title: {
            title: ['Build Tools Frontend'],
            description: 'DEVELOPER.developer.frontendRoadmap.buildToolsFront.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.buildToolsFront.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25 mb-0'
                    }
                ]
            }
        ],
        referenceContent: [
            {
                title: 'WEBPACK',
                link: 'https://www.w3.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'GULP',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'GRUNT',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            }
        ]
    },
    {
        title: {
            title: ['Linters And Formatters'],
            description: 'DEVELOPER.developer.frontendRoadmap.lintersAndFormatters.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.lintersAndFormatters.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25 mb-0'
                    }
                ]
            }
        ],
        referenceContent: [
            {
                title: 'ESLINT',
                link: 'https://www.w3.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'PRETTIER',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            }
        ]
    },
    {
        title: {
            title: ['Module Bundlers'],
            description: 'DEVELOPER.developer.frontendRoadmap.moduleBundlers.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.moduleBundlers.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25 mb-0'
                    }
                ]
            }
        ],
        referenceContent: [
            {
                title: 'WEBPACK',
                link: 'https://www.w3.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'ROLLUP',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'PARCEL',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            }
        ]
    },
    {
        title: {
            title: ['Testing'],
            description: 'DEVELOPER.developer.frontendRoadmap.testing.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.testing.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25 mb-0'
                    }
                ]
            }
        ],
        referenceContent: [
            {
                title: 'UNIT TESTING',
                link: 'https://www.w3.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'INTEGRATION TESTING',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'END-TO-END TESTING',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            }
        ]
    },
    {
        title: {
            title: ['Authentication Strategies'],
            description: 'DEVELOPER.developer.frontendRoadmap.AuthenticationStrategies.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.AuthenticationStrategies.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25 mb-0'
                    }
                ]
            }
        ],
        referenceContent: [
            {
                title: 'JWT',
                link: 'https://www.w3.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'OAUTH',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'OPENID CONNECT',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            }
        ]
    },
    {
        title: {
            title: ['Web Security Basics'],
            description: 'DEVELOPER.developer.frontendRoadmap.webSecurityBasic.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.webSecurityBasics.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25 mb-0'
                    }
                ]
            }
        ],
        referenceContent: [
            {
                title: 'CORS',
                link: 'https://www.w3.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'HTTPS',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'CONTENT SECURITY POLICY',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            }
        ]
    },
    {
        title: {
            title: ['Web Components'],
            description: 'DEVELOPER.developer.frontendRoadmap.webComponents.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.webComponents.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25 mb-0'
                    }
                ]
            }
        ],
        referenceContent: [
            {
                title: 'CUSTOM ELEMENTS',
                link: 'https://www.w3.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'SHADOW DOM',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'HTML TEMPLATES',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            }
        ]
    },
    {
        title: {
            title: ['Type Checkers'],
            description: 'DEVELOPER.developer.frontendRoadmap.typeCheckers.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.typeCheckers.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25 mb-0'
                    }
                ]
            }
        ],
        referenceContent: [
            {
                title: 'Typescript',
                link: 'https://www.w3.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'FLOW',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            }
        ]
    },
    {
        title: {
            title: ['SSR'],
            description: 'DEVELOPER.developer.frontendRoadmap.ssr.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.ssr.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25'
                    }
                ]
            }
        ]
    },
    {
        title: {
            title: ['GRAPHQL'],
            description: 'DEVELOPER.developer.frontendRoadmap.graphQL.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.graphQL.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25'
                    }
                ]
            }
        ]
    },
    {
        title: {
            title: ['PWAS'],
            description: 'DEVELOPER.developer.frontendRoadmap.pwas.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.pwas.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25'
                    }
                ]
            }
        ]
    },
    {
        title: {
            title: ['Static Site Generators'],
            description: 'DEVELOPER.developer.frontendRoadmap.staticSiteGenerators.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.staticSiteGenerators.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25 mb-0'
                    }
                ]
            }
        ],
        referenceContent: [
            {
                title: 'GATSBY',
                link: 'https://www.w3.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.staticSiteGenerators.titulo',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'JEKYLL',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'HUGO',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
        ]
    },
    {
        title: {
            title: ['Mobile Apps'],
            description: 'DEVELOPER.developer.frontendRoadmap.mobileApps.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.mobileApps.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25 mb-0'
                    }
                ]
            }
        ], referenceContent: [
            {
                title: 'REACT NATIVE',
                link: 'https://www.w3.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'FLUTTER',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'IONIC',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
        ]
    },
    {
        title: {
            title: ['Desktop Apps'],
            description: 'DEVELOPER.developer.frontendRoadmap.desktopApps.titulo'
        },
        textBlock: [
            {
                textBlock: [
                    {
                        sectionText: 'DEVELOPER.developer.frontendRoadmap.desktopApps.text1',
                        styleText: 'text-light f-open-sans-c fs-20 lh-25 mb-0'
                    }
                ]
            }
        ], referenceContent: [
            {
                title: 'ELECTRON',
                link: 'https://www.w3.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'NW.js',
                link: 'https://developer.mozilla.org/es/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            }
        ]
    },
]