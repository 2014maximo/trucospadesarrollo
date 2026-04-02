# Trucospadesarrollo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

Especificaciones y contribución: ver [CONTRIBUTING.md](CONTRIBUTING.md) y [docs/specs/](docs/specs/) (p. ej. nuevos posts: [docs/specs/blog-nuevo-post.md](docs/specs/blog-nuevo-post.md)). Contexto para asistentes: [AGENTS.md](AGENTS.md).

# SCAFOLDING
src/
├── app/
│   ├── core/               # Código base reutilizable, servicios globales
│   ├── shared/             # Componentes, pipes, directivas reutilizables
│   ├── features/           # Módulos funcionales específicos
│   │   ├── blog/           # Módulo del blog
│   │   │   ├── components/ # Componentes específicos del blog
│   │   │   ├── models/     # Interfaces/Clases relacionadas al blog
│   │   │   ├── pages/      # Páginas completas del blog
│   │   │   │   ├── post-list/       # Página con la lista de posts
│   │   │   │   ├── post-detail/     # Página de detalle de un post
│   │   │   ├── services/   # Servicios específicos del blog
│   │   │   ├── utils/      # Funciones auxiliares específicas del blog
│   │   │   ├── posts/      # Contenido de publicaciones
│   │   │   │   ├── 2025/
│   │   │   │   │   ├── 01/
│   │   │   │   │   │   ├── post-title-one/
│   │   │   │   │   │   │   ├── post.component.html
│   │   │   │   │   │   │   ├── post.component.ts
│   │   │   │   │   │   │   ├── post.component.scss
│   │   │   │   │   │   ├── post-title-two/
│   │   │   │   │   │       ├── ...
│   │   │   │   ├── 2024/
│   │   │   │   │   ├── ...
│   ├── home/               # Página de inicio
│   ├── about/              # Página acerca del autor/blog
│   ├── contact/            # Página de contacto
│   ├── app.component.html
│   ├── app.module.ts

# DESCRIPCIÓN
patrón: Feature-based Architecture
También es conocido como:

Modular Design
Domain-driven Folder Structure
Feature-first Organization

Principios clave de este patrón:
Cohesión alta:
Todos los archivos relacionados con una funcionalidad (componentes, servicios, modelos, etc.) se agrupan en una carpeta específica, lo que facilita encontrar, entender y modificar el código.

Separación de responsabilidades:
Cada carpeta de funcionalidad o módulo actúa como una unidad independiente con una responsabilidad clara.

Escalabilidad:
Es ideal para proyectos que crecerán con el tiempo porque las nuevas funcionalidades simplemente se agregan como nuevos módulos sin afectar la estructura existente.

Lazy loading y optimización:
Al combinar este patrón con el cargado diferido (lazy loading), solo se carga el código de una característica cuando se necesita, mejorando el rendimiento.

# DEPLOY GITHUB PAGES
Use command for deploy in 'www.trucospadesarrollo.com':
firebase deploy

Use commands for deploy in githubpages:
ng build --base-href "https://2014maximo.github.io/trucospadesarrollo/"
npx angular-cli-ghpages --dir=dist/trucospadesarrollo/browser