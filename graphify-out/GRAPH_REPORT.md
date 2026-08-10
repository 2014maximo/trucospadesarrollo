# Graph Report - .  (2026-08-05)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1004 nodes · 1860 edges · 95 communities (54 shown, 41 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.56)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5f7b8a0d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Owl
- blog/constants/categories.constant.ts
- global-functions.ts
- HeaderComponent
- ImageAdapterComponent
- devDependencies
- dynamic-content.component.ts
- first-description-block.model.ts
- categorias.model.ts
- ContactFormComponent
- PaginatorComponent
- HeaderPostComponent
- ContentIndexComponent
- app.config.server.ts
- category-base.component.ts
- top-tecnology.component.ts
- header.component.ts
- PhrasesComponent
- about.component.ts
- options
- GaleryPostComponent
- prism.js
- experience.component.ts
- .hasBaseUrl
- wp-post.dto.ts
- MenuHomeComponent
- trucospadesarrollo
- development
- AboutMeComponent
- galery-post.component.ts
- production
- aos
- from-blog.component.ts
- BlogContentService
- SliderHomeComponent
- cargarBreadcrumb
- ThemeService
- TraduccionService
- FromBlogComponent
- projects.component.ts
- testimonials.component.ts
- scripts.js
- angular.json
- dependencies
- options
- AiCategoryHeaderComponent
- DevCategoryHeaderComponent
- ContactMeComponent
- ExperienceComponent
- server.ts
- FallbackTranslatePipe
- polyfills
- CustomPreloadStrategy
- NgInstalationComponent
- HomeComponent
- AboutModule
- ContactComponent
- ContactModule
- BlogModule
- AiSpecDrivenDevelopmentComponent
- DevIasComponent
- NotFoundComponent
- @angular/compiler
- @angular/core
- @angular/fire
- @angular/forms
- @angular/platform-browser
- @angular/platform-browser-dynamic
- @angular/platform-server
- @angular/router
- @angular/ssr
- index.mjs
- bootstrap
- @colsen1991/ngx-translate-extract-marker
- express
- firebase
- @firebase/auth
- ng-circle-progress
- @ngx-translate/core
- @ngx-translate/http-loader
- prismjs
- rxfire
- rxjs
- tslib
- typewriter-effect
- blog.routes.ts
- AccordeonModel
- environment.prod.ts

## God Nodes (most connected - your core abstractions)
1. `Owl()` - 56 edges
2. `DatosPost` - 46 edges
3. `ContentIndexComponent` - 28 edges
4. `BlogContentService` - 26 edges
5. `HeaderComponent` - 26 edges
6. `RefImg` - 25 edges
7. `EstilosPost` - 24 edges
8. `IndiceDeContenidosModel` - 22 edges
9. `CategoriaPostModel` - 20 edges
10. `PostViewModel` - 20 edges

## Surprising Connections (you probably didn't know these)
- `polyfills` --extends--> `zone.js`  [EXTRACTED]
  angular.json → package.json
- `ExperienceComponent` --references--> `IEras`  [EXTRACTED]
  src/app/about/components/experience/experience.component.ts → src/app/about/models/experience.model.ts
- `IExperience` --references--> `IStyles`  [EXTRACTED]
  src/app/about/models/experience.model.ts → src/app/about/models/style.model.ts
- `CategoryBaseComponent` --references--> `CategoriaPostModel`  [EXTRACTED]
  src/app/features/blog/components/category-base/category-base.component.ts → src/app/features/blog/models/categorias.model.ts
- `CategoryBaseComponent` --references--> `CategoryViewModel`  [EXTRACTED]
  src/app/features/blog/components/category-base/category-base.component.ts → src/app/features/blog/models/category-view.model.ts

## Import Cycles
- None detected.

## Communities (95 total, 41 thin omitted)

### Community 0 - "Owl"
Cohesion: 0.06
Nodes (4): Owl(), prefixed(), TODO: Should be computed from number of min width items in stage, test()

### Community 1 - "blog/constants/categories.constant.ts"
Cohesion: 0.06
Nodes (49): TERMINOS_ANGULAR, ESTILO_RXJS, SUB_NG, AI, ESTILO_AI, ANDROID, ESTILO_ANDROID, ANGULAR (+41 more)

### Community 2 - "global-functions.ts"
Cohesion: 0.10
Nodes (24): CATEGORIA, CategoriaPostModel, SubCategoriaModel, IndiceDeContenidosModel, EXT_MONEY, EXTRA_MONEY, ContentAuthorComponent, Component (+16 more)

### Community 3 - "HeaderComponent"
Cohesion: 0.07
Nodes (20): AiCategoryComponent, Component, AngularCategoryComponent, Component, DevCategoryComponent, Component, CategoryHeaderComponent, Component (+12 more)

### Community 4 - "ImageAdapterComponent"
Cohesion: 0.06
Nodes (22): HostBinding, DevCategoryContentComponent, Component, Input, BlockContentComponent, Component, Input, BlockTextComponent (+14 more)

### Community 5 - "devDependencies"
Cohesion: 0.05
Nodes (41): angular-cli-ghpages, @angular/compiler-cli, @angular-devkit/build-angular, jasmine-core, karma, karma-chrome-launcher, karma-coverage, karma-jasmine (+33 more)

### Community 6 - "dynamic-content.component.ts"
Cohesion: 0.07
Nodes (21): ImgSlider, AiCategoryContentComponent, Component, Input, INDEX_BUTTONS_DEV_SITES, COMPONENT_REGISTRY, ComponentEntry, ComponentSegment (+13 more)

### Community 7 - "first-description-block.model.ts"
Cohesion: 0.09
Nodes (12): BACKEND_ROADMAP, DEV_FUNDAMENTALS, FRONTEND_ROADMAP, FirstDescriptionBlockComponent, Component, Input, ImageModel, FirstDescriptionBlockModel (+4 more)

### Community 8 - "categorias.model.ts"
Cohesion: 0.12
Nodes (16): TERMINOS_DB, TERMINOS_DEVELOPER, TERMINOS_HTML, Categoria, CategoriasModel, ClipboardModel, DatosCategoria, DescripcionesI (+8 more)

### Community 9 - "ContactFormComponent"
Cohesion: 0.12
Nodes (11): BLOG_WP_GRAPHQL_URL, BLOG_WP_GRAPHQL_URL_TOKEN, ContactFormComponent, Component, FooterHomeComponent, Component, ContactPayload, ContactResponse (+3 more)

### Community 10 - "PaginatorComponent"
Cohesion: 0.16
Nodes (7): HostListener, Pagina, PaginatorComponent, Component, Inject, Input, Output

### Community 11 - "HeaderPostComponent"
Cohesion: 0.13
Nodes (5): HeaderPostComponent, Component, Inject, Input, Output

### Community 12 - "ContentIndexComponent"
Cohesion: 0.13
Nodes (6): ContentIndexComponent, Component, Input, Output, posicionAleatoria(), POSICIONES_INDICE

### Community 13 - "app.config.server.ts"
Cohesion: 0.19
Nodes (7): AppComponent, Component, appConfig, config, serverConfig, routes, serverRoutes

### Community 14 - "category-base.component.ts"
Cohesion: 0.22
Nodes (8): CategoryBaseEstado, PostBaseComponent, PostBaseEstado, Component, CategoryViewModel, PostViewModel, SlideItem, SliderEstado

### Community 15 - "top-tecnology.component.ts"
Cohesion: 0.22
Nodes (8): TOP_DATABASES, TOP_FRAMEWORKS, TOP_IDES, TOP_LANGUAGE, TopTecnologyModel, TopTecnologyComponent, Component, Inject

### Community 16 - "header.component.ts"
Cohesion: 0.25
Nodes (5): CategoriesComponent, Component, CATEGORIES, SearchResultItem, CategoriesPageModel

### Community 17 - "PhrasesComponent"
Cohesion: 0.19
Nodes (7): PHRASES, PhrasesComponent, PhrasesEstado, Component, Inject, TypePhase, IFrasesModel

### Community 18 - "about.component.ts"
Cohesion: 0.18
Nodes (7): FooterComponent, Component, HobbiesComponent, Component, SkillsComponent, Component, Inject

### Community 19 - "options"
Cohesion: 0.17
Nodes (13): options, allowedCommonJsDependencies, browser, index, outputMode, outputPath, scripts, server (+5 more)

### Community 20 - "GaleryPostComponent"
Cohesion: 0.19
Nodes (3): GaleryPostComponent, Component, Input

### Community 21 - "prism.js"
Cohesion: 0.26
Nodes (9): c(), f(), i(), l(), n(), o(), q(), s() (+1 more)

### Community 22 - "experience.component.ts"
Cohesion: 0.30
Nodes (6): EXPERIENCE, FROM_BLOG, IEras, IExperience, IFromBlog, IStyles

### Community 24 - "wp-post.dto.ts"
Cohesion: 0.17
Nodes (11): WpGraphqlCategories, WpGraphqlCategoryEdge, WpGraphqlCategoryEdgeNode, WpGraphqlData, WpGraphqlFeaturedImage, WpGraphqlFeaturedImageNode, WpGraphqlPages, WpGraphqlPagesData (+3 more)

### Community 26 - "trucospadesarrollo"
Cohesion: 0.18
Nodes (11): deploy, extract-i18n, builder, builder, trucospadesarrollo, architect, prefix, projectType (+3 more)

### Community 27 - "development"
Cohesion: 0.18
Nodes (11): serve, development, buildTarget, extractLicenses, optimization, sourceMap, proxyConfig, builder (+3 more)

### Community 28 - "AboutMeComponent"
Cohesion: 0.22
Nodes (5): aos, AboutMeComponent, Component, Inject, Output

### Community 29 - "galery-post.component.ts"
Cohesion: 0.22
Nodes (4): GalleryEstado, GalleryPostItem, Inject, TraslateForce

### Community 30 - "production"
Cohesion: 0.20
Nodes (10): build, builder, configurations, defaultConfiguration, production, budgets, buildTarget, fileReplacements (+2 more)

### Community 31 - "aos"
Cohesion: 0.20
Nodes (5): aos, aos, AboutComponent, Component, Inject

### Community 32 - "from-blog.component.ts"
Cohesion: 0.31
Nodes (4): FromBlogEstado, FromBlogItem, resolverIconoCategoria(), Theme

### Community 33 - "BlogContentService"
Cohesion: 0.24
Nodes (5): WpGraphqlPageNode, WpGraphqlPostNode, BlogContentService, Inject, Injectable

### Community 34 - "SliderHomeComponent"
Cohesion: 0.22
Nodes (3): SliderHomeComponent, Component, ViewChild

### Community 35 - "cargarBreadcrumb"
Cohesion: 0.22
Nodes (5): DevExtraMoneyComponent, Component, DevSitesComponent, Component, cargarBreadcrumb()

### Community 36 - "ThemeService"
Cohesion: 0.33
Nodes (3): ThemeService, Inject, Injectable

### Community 37 - "TraduccionService"
Cohesion: 0.39
Nodes (3): TraduccionService, Inject, Injectable

### Community 39 - "projects.component.ts"
Cohesion: 0.43
Nodes (4): ProjectsComponent, Component, PROJECTS, IProject

### Community 40 - "testimonials.component.ts"
Cohesion: 0.43
Nodes (4): TestimonialsComponent, Component, TESTIMONIALS, ITestimonial

### Community 42 - "angular.json"
Cohesion: 0.29
Nodes (6): analytics, cli, newProjectRoot, projects, $schema, version

### Community 43 - "dependencies"
Cohesion: 0.29
Nodes (7): @angular/animations, @angular/common, firebase-tools, dependencies, @angular/animations, @angular/common, firebase-tools

### Community 44 - "options"
Cohesion: 0.29
Nodes (7): test, assets, tsConfig, builder, options, src/assets, src/favicon.ico

### Community 45 - "AiCategoryHeaderComponent"
Cohesion: 0.33
Nodes (3): AiCategoryHeaderComponent, Component, Input

### Community 46 - "DevCategoryHeaderComponent"
Cohesion: 0.33
Nodes (3): DevCategoryHeaderComponent, Component, Input

### Community 47 - "ContactMeComponent"
Cohesion: 0.33
Nodes (3): ContactMeComponent, Component, Inject

### Community 48 - "ExperienceComponent"
Cohesion: 0.33
Nodes (3): ExperienceComponent, Component, Inject

### Community 49 - "server.ts"
Cohesion: 0.33
Nodes (5): angularApp, app, browserDistFolder, reqHandler, serverDistFolder

### Community 51 - "polyfills"
Cohesion: 0.50
Nodes (4): polyfills, zone.js, zone.js/testing, zone.js

## Knowledge Gaps
- **170 isolated node(s):** `$schema`, `version`, `newProjectRoot`, `projectType`, `schematics` (+165 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `aos`, `polyfills`, `@angular/compiler`, `@angular/core`, `@angular/fire`, `@angular/forms`, `@angular/platform-browser`, `@angular/platform-browser-dynamic`, `@angular/platform-server`, `@angular/router`, `@angular/ssr`, `bootstrap`, `@colsen1991/ngx-translate-extract-marker`, `express`, `firebase`, `@firebase/auth`, `ng-circle-progress`, `@ngx-translate/core`, `@ngx-translate/http-loader`, `prismjs`, `rxfire`, `rxjs`, `tslib`, `typewriter-effect`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **Why does `aos` connect `aos` to `ExperienceComponent`, `about.component.ts`, `dependencies`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **Why does `options` connect `options` to `polyfills`, `options`, `production`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **What connects `$schema`, `version`, `newProjectRoot` to the rest of the system?**
  _170 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Owl` be split into smaller, more focused modules?**
  _Cohesion score 0.06413730803974707 - nodes in this community are weakly interconnected._
- **Should `blog/constants/categories.constant.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.056842105263157895 - nodes in this community are weakly interconnected._
- **Should `global-functions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10105580693815988 - nodes in this community are weakly interconnected._