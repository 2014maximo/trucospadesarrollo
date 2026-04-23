# Contexto para agentes y asistentes

Este repositorio usa **desarrollo guiado por especificaciones**: los procedimientos canónicos viven en `docs/specs/` y deben respetarse salvo que el usuario indique otra cosa en la conversación.

## Proyecto

- **Angular 19**, arquitectura por features (`src/app/core`, `shared`, `features`).
- Blog en `src/app/features/blog/`: posts como componentes, metadatos en constantes TypeScript, rutas lazy, **ngx-translate** (`src/assets/i18n/`).

## Especificaciones

| Documento | Uso |
|-----------|-----|
| [docs/specs/blog-nuevo-post.md](docs/specs/blog-nuevo-post.md) | Alta de publicación: componente, constante, rutas, i18n (es/en/fr), tests. |
| [docs/specs/blog-headless-content.md](docs/specs/blog-headless-content.md) | Post dinámico: WordPress REST, `BlogContentService`, `PostBaseComponent`, rutas `:slug`, tests. |
| [docs/specs/shared-image-adapter.md](docs/specs/shared-image-adapter.md) | `ImageAdapterComponent`: modelo único `ImageAdapterModel`, uso y tests. |

Si trabajas fuera de Cursor, el mismo contenido aplica; en Cursor, las reglas en `.cursor/rules/` reforzarán estos puntos según el tipo de archivo.

## Comandos habituales

- Servidor local: `npm start` / `ng serve`
- Compilación: `npm run build`
- **Tests unitarios:** `npm test` / `ng test`

## Idioma

Las reglas y especificaciones del repo están redactadas en **español**.

## Contribución humana

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para enlaces y convenciones generales.
