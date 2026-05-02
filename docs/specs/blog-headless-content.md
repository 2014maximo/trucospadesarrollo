# Especificación: contenido del blog vía WordPress Headless

Documento canónico para humanos, revisores y agentes. Mantenerlo alineado con el código bajo `src/app/features/blog/`.

## Objetivo

Un único componente de detalle (`PostBaseComponent`) obtiene el HTML y metadatos desde la **GraphQL API** de WordPress y los enlaza a la vista, evitando un componente Angular por cada publicación.

## Archivos de referencia

| Pieza | Ruta |
|-------|------|
| URL base del API | `src/app/features/blog/config/blog-wp-graphql.config.ts` (`BLOG_WP_GRAPHQL_URL`) |
| Token opcional para tests / override | `src/app/features/blog/tokens/blog-wp-graphql-url.token.ts` (`BLOG_WP_GRAPHQL_URL_TOKEN`) |
| Servicio HTTP + mapeo DTO → vista | `src/app/features/blog/services/blog-content.service.ts` |
| DTO WordPress | `src/app/features/blog/models/wp-post.dto.ts` |
| Modelo de vista | `src/app/features/blog/models/post-view.model.ts` |
| Componente standalone | `src/app/features/blog/components/post-base/post-base.component.ts` |
| Rutas dinámicas `:categoria/:slug` | `src/app/features/blog/blog.routes.ts` |
| Textos UI (es / en / fr) | Claves `BLOG_POST_BASE.*` en `src/assets/i18n/*.json` |
| Pruebas | `blog-content.service.spec.ts`, `post-base.component.spec.ts` |

## Contrato del servicio `BlogContentService`

- `hasBaseUrl()`: `true` si la URL inyectada (token) tiene texto tras `trim()`.
- `getPostBySlug(slug: string)`: Realiza una petición `POST` al endpoint de GraphQL, inyectando la variable `$slug` y resolviendo también el parámetro `?lang=...` según el `TranslateService` para soporte multi-idioma a través de WPGraphQL Polylang.
  - Si el slug está vacío o no hay URL base, emite `null` **sin** HTTP.
  - Si la respuesta es vacía, emite `null`.
  - Si hay al menos un elemento, mapea el primero a `PostViewModel`.

## Modelo de vista `PostViewModel`

Campos pensados para la plantilla actual: título en texto plano, cuerpo y resumen como HTML (`contenidoHtml`, `resumenHtml`), fechas ISO, categoría, y el modelo `ContentAuthorModel` mapeado desde el campo ACF `contentauthormodel`.

## Componente `PostBaseComponent`

- Lee `slug` de `ActivatedRoute.snapshot.paramMap`.
- Si no hay API configurada: estado `sin-api` y mensaje `BLOG_POST_BASE.noApi`.
- Si el slug está vacío: estado `no-encontrado` sin llamar al servicio.
- Contenido HTML: `DomSanitizer.bypassSecurityTrustHtml` (origen: CMS de confianza). En producción, valorar endurecer (lista de tags, CSP, etc.).
- Reutiliza la estructura de presentación base usada en otros posts (título, fecha, icono de categoría, y `ContentAuthorComponent`).
- Reutiliza `HeaderComponent` y `FooterComponent` como otros posts.

## Rutas

La ruta genérica **`path: ':categoria/:slug'`** maneja dinámicamente cualquier petición de posts.

Ejemplos de URL resultante:

- `/blog/developer/mi-post-wordpress`
- `/blog/angular/mi-articulo`
- `/blog/ai/otro-slug`

## i18n

El servicio `BlogContentService` utiliza dinámicamente `TranslateService` para asignar el sufijo de lenguaje a la petición GraphQL (`?lang=es`, `en`, `fr`). Toda cadena estática en el componente (como mensajes de error) utiliza las claves `BLOG_POST_BASE.*`.

## Pruebas

- Tras cambios en servicio o componente: `npm test`.
- `BlogContentService`: comprobar petición HTTP POST a GraphQL con las variables y queries adecuadas, mapeo al DTO modificado, ausencia de petición con slug vacío.
- `PostBaseComponent`: estados `sin-api`, `no-encontrado` (slug vacío y respuesta null), `error`, y render con publicación mock (spy del servicio). Se requiere importar `TranslateModule.forRoot()`.

## Integración con imágenes en bloques

Si el HTML de WordPress debe mostrarse con el patrón de zoom del proyecto, reutilizar **`ImageAdapterComponent`** y el modelo descrito en [shared-image-adapter.md](shared-image-adapter.md) (suele requerir adaptación del HTML o bloques estructurados, no solo `innerHTML` crudo).

## Qué no hacer

- No duplicar lógica de fetch en cada categoría: el servicio es la única puerta al API.
- No utilizar rutas duras predefinidas; la ruta paramétrica maneja la estructura genéricamente.
