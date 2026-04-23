# Especificación: contenido del blog vía WordPress Headless

Documento canónico para humanos, revisores y agentes. Mantenerlo alineado con el código bajo `src/app/features/blog/`.

## Objetivo

Un único componente de detalle (`PostBaseComponent`) obtiene el HTML y metadatos desde la **REST API** de WordPress (`/wp/v2/posts`) y los enlaza a la vista, evitando un componente Angular por cada publicación.

## Archivos de referencia

| Pieza | Ruta |
|-------|------|
| URL base del API (sin barra final) | `src/app/features/blog/config/blog-wp-rest.config.ts` (`BLOG_WP_REST_BASE_URL`) |
| Token opcional para tests / override | `src/app/features/blog/tokens/blog-wp-rest-url.token.ts` (`BLOG_WP_REST_URL`) |
| Servicio HTTP + mapeo DTO → vista | `src/app/features/blog/services/blog-content.service.ts` |
| DTO WordPress | `src/app/features/blog/models/wp-post.dto.ts` |
| Modelo de vista | `src/app/features/blog/models/post-view.model.ts` |
| Componente standalone | `src/app/features/blog/components/post-base/post-base.component.ts` |
| Rutas dinámicas `:slug` | `src/app/features/blog/posts/*/(*.routes.ts)` (después de rutas estáticas) |
| Textos UI (es / en / fr) | Claves `BLOG_POST_BASE.*` en `src/assets/i18n/*.json` |
| Pruebas | `blog-content.service.spec.ts`, `post-base.component.spec.ts` |

## Contrato del servicio `BlogContentService`

- `hasBaseUrl()`: `true` si la URL inyectada (token) tiene texto tras `trim()`.
- `getPostBySlug(slug: string)`: `GET {apiBase}/posts?slug={slug}&_embed=1`.
  - Si el slug está vacío o no hay URL base, emite `null` **sin** HTTP.
  - Si la respuesta es `[]`, emite `null`.
  - Si hay al menos un elemento, mapea el primero a `PostViewModel`.

## Modelo de vista `PostViewModel`

Campos pensados para la plantilla actual: título en texto plano (sin etiquetas HTML del título de WP), cuerpo y resumen como HTML (`contenidoHtml`, `resumenHtml`), fechas ISO, nombre del autor si viene en `_embedded.author`.

## Componente `PostBaseComponent`

- Lee `slug` de `ActivatedRoute.snapshot.paramMap`.
- Si no hay API configurada: estado `sin-api` y mensaje `BLOG_POST_BASE.noApi`.
- Si el slug está vacío: estado `no-encontrado` sin llamar al servicio.
- Contenido HTML: `DomSanitizer.bypassSecurityTrustHtml` (origen: CMS de confianza). En producción, valorar endurecer (lista de tags, CSP, etc.).
- Reutiliza `HeaderComponent` y `FooterComponent` como otros posts.

## Rutas

En cada categoría (`developer`, `angular`, `ai`), la ruta **`path: ':slug'`** debe ir **al final**, después de segmentos fijos (`sites`, `instalacion`, `sdd`, etc.), para no capturar URLs estáticas.

Ejemplos de URL resultante:

- `/blog/developer/mi-post-wordpress`
- `/blog/angular/mi-articulo`
- `/blog/ai/otro-slug`

## i18n

Toda cadena nueva del componente debe existir en **es**, **en** y **fr** con el prefijo `BLOG_POST_BASE`.

## Pruebas

- Tras cambios en servicio o componente: `npm test`.
- `BlogContentService`: comprobar URL, parámetros `slug` y `_embed`, mapeo desde JSON de ejemplo, ausencia de petición con slug vacío.
- `PostBaseComponent`: estados `sin-api`, `no-encontrado` (slug vacío y respuesta null), `error`, y render con publicación mock (spy del servicio).

## Integración con imágenes en bloques

Si el HTML de WordPress debe mostrarse con el patrón de zoom del proyecto, reutilizar **`ImageAdapterComponent`** y el modelo descrito en [shared-image-adapter.md](shared-image-adapter.md) (suele requerir adaptación del HTML o bloques estructurados, no solo `innerHTML` crudo).

## Qué no hacer

- No duplicar lógica de fetch en cada categoría: el servicio es la única puerta al API.
- No colocar `:slug` antes de rutas literales en el mismo `Routes`.
