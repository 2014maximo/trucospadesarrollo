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
                link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
                description: 'DEVELOPER.developer.frontendRoadmap.css.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'LAYOUTSRESPONSIVE',
                link: 'https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout/Responsive_Design',
                description: 'DEVELOPER.developer.frontendRoadmap.css.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'DESIGN',
                link: 'https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout',
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
                link: 'https://smacss.com/book/',
                description: 'DEVELOPER.developer.frontendRoadmap.cssArchitecture.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'OOCSS',
                link: 'https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/',
                description: 'DEVELOPER.developer.frontendRoadmap.cssArchitecture.descripcionLink3',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'ATOMIC DESIGN',
                link: 'https://css-tricks.com/lets-define-exactly-atomic-css/',
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
                link: 'https://sass-lang.com/documentation/',
                description: 'DEVELOPER.developer.frontendRoadmap.cssPreprocessors.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: ' ',
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
        ],
        referenceContent: [
            {
                title: 'ECMASCRIPT',
                link: 'https://developer.mozilla.org/es/docs/Glossary/ECMAScript',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'MDN WEB DOCS - JAVASCRIPT',
                link: 'https://developer.mozilla.org/es/docs/Web/JavaScript',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
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
        ],
        referenceContent: [
            {
                title: 'HTTP',
                link: 'https://developer.mozilla.org/es/docs/Web/HTTP',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'HTTPS',
                link: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'DNS',
                link: 'https://support.google.com/a/answer/48090?',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
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
                link: 'https://git-scm.com/',
                description: 'DEVELOPER.developer.frontendRoadmap.versionControlSistem.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'SVN',
                link: 'https://subversion.apache.org/docs/',
                description: 'DEVELOPER.developer.frontendRoadmap.versionControlSistem.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'MERCURIAL',
                link: 'https://www.mercurial-scm.org',
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
        ],
        referenceContent:[
            {
                title: 'GITHUB',
                link: 'https://github.com/',
                description: 'DEVELOPER.developer.frontendRoadmap.versionControlSistem.descripcionLink3',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'BITBUCKET',
                link: 'https://bitbucket.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.versionControlSistem.descripcionLink3',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'GITLAB',
                link: 'https://gitlab.com/',
                description: 'DEVELOPER.developer.frontendRoadmap.versionControlSistem.descripcionLink3',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
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
        ],
        referenceContent:[
            {
                title: 'NPM (NODE.JS)',
                link: 'https://www.npmjs.com/',
                description: 'DEVELOPER.developer.frontendRoadmap.versionControlSistem.descripcionLink3',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'YARN',
                link: 'https://yarnpkg.com/',
                description: 'DEVELOPER.developer.frontendRoadmap.versionControlSistem.descripcionLink3',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'PNPM',
                link: 'https://pnpm.io/motivation',
                description: 'DEVELOPER.developer.frontendRoadmap.versionControlSistem.descripcionLink3',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
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
        ],
        referenceContent: [
            {
                title: 'REACT',
                link: 'https://react.dev/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'ANGULAR',
                link: 'https://angular.io/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'VUE',
                link: 'https://vuejs.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
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
                link: 'https://webpack.js.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'GULP',
                link: 'https://gulpjs.com/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'GRUNT',
                link: 'https://gruntjs.com/',
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
                link: 'http://eslint.org/docs/latest/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'PRETTIER',
                link: 'https://prettier.io/docs/index.html',
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
                title: 'ROLLUP',
                link: 'https://rollupjs.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'PARCEL',
                link: 'https://parceljs.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'VITE',
                link: 'https://vitejs.dev/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'SNOWPACK',
                link: 'https://www.snowpack.dev/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'ESBUILD',
                link: 'https://esbuild.github.io/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'BROWSERIFY',
                link: 'http://browserify.org/',
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
                title: 'JEST',
                link: 'https://jestjs.io/docs/getting-started',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'MOCHA',
                link: 'https://mochajs.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'JASMINE',
                link: 'https://jasmine.github.io/',
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
                link: 'https://jwt.io/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'OAUTH',
                link: 'https://oauth.net/2/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'OPENID CONNECT',
                link: 'https://openid.net/specs/openid-connect-core-1_0.html',
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
                link: 'https://developer.mozilla.org/es/docs/Web/HTTP/Guides/CORS',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'CONTENT SECURITY POLICY',
                link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP',
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
                link: 'https://custom-elements-manifest.open-wc.org/analyzer/getting-started/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'SHADOW DOM',
                link: 'https://developer.mozilla.org/es/docs/Web/API/Web_components/Using_shadow_DOM',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'HTML TEMPLATES',
                link: 'https://blog.pixelfreestudio.com/how-to-use-html-templates-in-web-components/',
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
                link: 'https://www.typescriptlang.org/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'FLOW',
                link: 'https://support.flow-software.com/hc/en-us/categories/360002305879-Product-Documentation',
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
                link: 'https://www.gatsbyjs.com/docs/cheat-sheet/',
                description: 'DEVELOPER.developer.frontendRoadmap.staticSiteGenerators.titulo',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'JEKYLL',
                link: 'https://jekyllrb.com/docs/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'HUGO',
                link: 'https://gohugo.io/documentation/',
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
                link: 'https://reactnative.dev/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'FLUTTER',
                link: 'https://docs.flutter.dev/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            },
            {
                title: 'IONIC',
                link: 'https://ionicframework.com/',
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
                link: 'https://www.electronjs.org/es/docs/latest/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink',
                classStyle: 'fuenteSeis linkReference cursor-p rot-1'
            },
            {
                title: 'NW.js',
                link: 'https://nwjs.io/',
                description: 'DEVELOPER.developer.frontendRoadmap.html.descripcionLink2',
                classStyle: 'fuenteSeis linkReference cursor-p rot-3'
            }
        ]
    }
]