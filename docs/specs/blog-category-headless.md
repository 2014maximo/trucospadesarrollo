# Especificación: categorías del blog vía WordPress Headless

Documento canónico para humanos, revisores y agentes. Mantenerlo alineado con el código bajo `src/app/features/blog/`.

## Objetivo

Un único componente de detalle (`CategoryBaseComponent`) obtiene el HTML de la página de categoría desde la **GraphQL API** de WordPress (`pages` query) y lo enlaza a la vista, evitando un componente Angular por cada categoría.

Los datos estáticos de la categoría (ícono, color, lista de posts) siguen viviendo en la constante `CATEGORIA` y se usan como enriquecimiento visual y como fallback cuando la API no está disponible.

## Archivos de referencia

| Pieza | Ruta |
|-------|------|
| URL base del API | `src/app/features/blog/config/blog-wp-graphql.config.ts` (`BLOG_WP_GRAPHQL_URL`) |
| Token opcional para tests / override | `src/app/features/blog/tokens/blog-wp-graphql-url.token.ts` (`BLOG_WP_GRAPHQL_URL_TOKEN`) |
| Servicio HTTP + mapeo DTO → vista | `src/app/features/blog/services/blog-content.service.ts` |
| DTO WordPress (posts + pages) | `src/app/features/blog/models/wp-post.dto.ts` |
| Modelo de vista de categoría | `src/app/features/blog/models/category-view.model.ts` |
| Constante de categorías locales | `src/app/features/blog/constants/categories.constant.ts` |
| Componente standalone | `src/app/features/blog/components/category-base/category-base.component.ts` |
| Rutas dinámicas `:categoria` y `:categoria/:slug` | `src/app/features/blog/blog.routes.ts` |
| Textos UI (es / en / fr) | Claves `BLOG_CATEGORY_BASE.*` en `src/assets/i18n/*.json` |
| Pruebas | `category-base.component.spec.ts` |

## GraphQL query utilizada

```graphql
query GetCategory($slug: String!) {
  pages(where: { name: $slug }) {
    edges {
      node {
        id
        title
        content
        slug
        uri
      }
    }
  }
}
```

> **Nota:** Si en el futuro se necesita más información (imagen destacada, autor, etc.) se puede ampliar el query y el DTO `WpGraphqlPageNode` sin modificar el componente.

## Contrato del servicio `BlogContentService`

- `hasBaseUrl()`: ya existente; reutilizada por ambos métodos.
- `getCategoryBySlug(slug: string)`: Realiza una petición `POST` al endpoint de GraphQL con la query de páginas.
  - Si el slug está vacío o no hay URL base, emite `null` **sin** HTTP.
  - Si la respuesta no tiene nodos, emite `null`.
  - Si hay al menos un edge, mapea el primero a `CategoryViewModel`.

## Modelo de vista `CategoryViewModel`

| Campo | Descripción |
|-------|-------------|
| `id` | ID interno de WordPress |
| `slug` | Slug de la página (= nombre de categoría en la URL) |
| `titulo` | Título en texto plano (sin HTML) |
| `contenidoHtml` | Cuerpo HTML de la página (sanear con `DomSanitizer`) |

## Componente `CategoryBaseComponent`

- Lee `categoria` de `ActivatedRoute.snapshot.paramMap`.
- Busca datos locales en `CATEGORIA` (ícono, color) para enriquecer la vista.
- Si no hay API configurada: estado `sin-api` y mensaje `BLOG_CATEGORY_BASE.noApi`. Muestra la cabecera con datos estáticos.
- Si el slug está vacío: estado `no-encontrado` sin llamar al servicio.
- Contenido HTML: `DomSanitizer.bypassSecurityTrustHtml` (origen: CMS de confianza).
- Reutiliza `HeaderComponent` y `FooterComponent`.

## Rutas

La ruta genérica **`path: ':categoria'`** maneja dinámicamente cualquier petición de categoría.
Debe declararse **antes** de `':categoria/:slug'` para que Angular resuelva correctamente.

| URL | Componente |
|-----|------------|
| `/blog/developer` | `CategoryBaseComponent` |
| `/blog/angular` | `CategoryBaseComponent` |
| `/blog/developer/mi-post` | `PostBaseComponent` |

## i18n

El servicio reutiliza `TranslateService` para el parámetro `?lang=`. Claves de cadenas estáticas en el componente:

| Clave | Uso |
|-------|-----|
| `BLOG_CATEGORY_BASE.loading` | Estado de carga |
| `BLOG_CATEGORY_BASE.error` | Error de red |
| `BLOG_CATEGORY_BASE.notFound` | Categoría no encontrada |
| `BLOG_CATEGORY_BASE.noApi` | Sin URL de API configurada |

## Pruebas

- Tras cambios en servicio o componente: `npm test`.
- `CategoryBaseComponent`: estados `sin-api`, `no-encontrado` (slug vacío y respuesta null), `error`, y render con categoría mock (spy del servicio). Se requiere importar `TranslateModule.forRoot()`.

## Qué no hacer

- No duplicar lógica de fetch en cada categoría: el servicio es la única puerta al API.
- No crear un componente Angular individual por cada categoría; la ruta paramétrica lo maneja genéricamente.
- No eliminar la constante `CATEGORIA`: sigue siendo la fuente de verdad para datos estáticos (ícono, color, lista de posts).
