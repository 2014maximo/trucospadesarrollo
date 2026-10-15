# Especificación: `GlossaryComponent`

Componente compartido (`app-glossary`) que muestra un glosario de términos con buscador, índice A–Z y paginación. Todo el contenido llega en un único objeto **`GlossaryModel`** (`src/app/shared/models/glossary.model.ts`), normalmente como JSON dentro de un post de WordPress. El componente **no** lee constantes del proyecto.

## Modelo `GlossaryModel`

| Campo | Tipo | Por defecto | Descripción |
|-------|------|-------------|-------------|
| `title` | `GlossaryText` | clave `Glosario` | Texto o clave i18n del encabezado. |
| `color` | `string` | `''` | Clase CSS de color para encabezado, buscador, índice y títulos (p. ej. `c-Angular`). |
| `itemsPerPage` | `number` | `30` | Términos por página en escritorio. |
| `itemsMobile` | `number` | `10` | Términos por página en móvil (≤ 768 px). |
| `terms` | `GlossaryTermModel[]` | `[]` | Términos. Si está vacío o falta, el componente **no renderiza** nada. |

### `GlossaryTermModel`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `title` | `GlossaryText` | **Obligatorio.** Los términos sin título se descartan. |
| `id` | `string` | Opcional. Base del ancla del término (`#glosario-<id>`). Si falta, se deriva del título. |
| `category` | `GlossaryText` | Opcional. Etiqueta bajo el título. |
| `updatedAt` | `GlossaryText` | Opcional. Fecha en formato `AAAA-MM-DD`. |
| `paragraphs` | `GlossaryText[]` | Párrafos de la descripción. |
| `sections` | `{ titles?: GlossaryText[]; items?: GlossaryText[] }[]` | Bloques con títulos en negrita y lista de elementos. |
| `image` | `Partial<ImageAdapterModel>` | Imagen descriptiva; ver [shared-image-adapter.md](shared-image-adapter.md). Solo `src` es necesario. |
| `links` | `{ title?: string; url: string }[]` | `http(s)://…` abre en otra pestaña; cualquier otro valor es una ruta interna completa (p. ej. `/blog/angular/mi-post`). |

### Textos personalizables (`GlossaryText`)

Cada texto admite dos formas, que se pueden mezclar en el mismo JSON:

- **Cadena** (`"Mi texto"`): se pinta con las clases por defecto del componente.
- **`TextModel`** (el mismo de `block-content`, `src/app/shared/models/block-content.model.ts`):

| Campo | Descripción |
|-------|-------------|
| `text` | Contenido. Se pinta como **texto plano**: aquí no se interpreta HTML (a diferencia de `block-content`), porque el texto se trocea para resaltar la búsqueda. |
| `styleText` | Clases CSS. Si viene, **sustituye por completo** a las clases por defecto de ese texto (incluido el color del glosario); si falta o está vacío, se usan las de por defecto. |
| `url` | Opcional. Convierte el texto en enlace. |
| `target` | Opcional, `_blank` por defecto. |

Clases por defecto (`<color>` es el campo `color` del glosario):

| Texto | Clases |
|-------|--------|
| Encabezado (`title` del glosario) | `text-center f-bebas fs-50 fw-6 <color>` |
| Título del término | `f-shadow-into-l <color> fs-35 lh-25 p-0 m-0` |
| `category` | `f-shadow-into-l fs-25 c1 m-0` |
| `updatedAt` | `f-shadow-into-l c7 fs-12 m-0` |
| `paragraphs` | `glossary-text f-open-sans-c fs-20` |
| `sections.titles` | `glossary-text f-open-sans-c fs-20 fw-bold m-0` |
| `sections.items` | `glossary-text f-open-sans-c fs-20 m-0 ps-3` |

`glossary-text` hace que el texto herede el color del tema activo.

```json
{
  "title": { "text": "Signal", "styleText": "f-yanone fs-40 c-Angular" },
  "paragraphs": [
    "Párrafo con el estilo por defecto.",
    { "text": "Párrafo personalizado y enlazado.", "styleText": "c7 f-open-sans-c fs-18", "url": "https://angular.dev/guide/signals" }
  ]
}
```

## Comportamiento

- **Orden:** alfabético por título (sin distinguir tildes ni mayúsculas), no el orden del JSON.
- **Diseño alternado:** el primer término va a la izquierda, el siguiente a la derecha, y así sucesivamente. La imagen ocupa el lado opuesto al texto; sin imagen ese lado queda vacío. En móvil se apilan (texto y luego imagen).
- **Búsqueda:** sobre título, categoría, párrafos y secciones, sin distinguir tildes ni mayúsculas. Las coincidencias se marcan con `<mark>` mediante `HighlightPipe` (`src/app/shared/pipes/highlight.pipe.ts`), sin `innerHTML`.
- **Borrar búsqueda:** con texto en el buscador aparece una X al final del campo; al pulsarla se vacía, vuelven a mostrarse todos los términos (respetando la letra activa) y el foco queda en el campo.
- **Índice A–Z:** solo muestra las iniciales presentes; `#` agrupa los términos que no empiezan por letra. Pulsar la letra activa vuelve a «Todos». Se combina con la búsqueda. No se muestra si solo hay una inicial.
- **Anclas:** cada término tiene `id="glosario-<slug>"`. Si dos términos generan el mismo slug, el segundo recibe `-2`, etc. Al entrar con ese fragmento en la URL, el componente busca el término (rellena el buscador con su título) y hace scroll hasta él.
- **SSR:** no usa `window` ni `document` fuera de navegador.

## Uso desde WordPress

En un bloque **HTML personalizado**, con el `<script>` y el marcador en el mismo bloque:

```html
<script type="application/json" data-component-id="glossary">
{
  "type": "glossary",
  "data": {
    "title": "Glosario",
    "color": "c-Angular",
    "terms": [
      {
        "title": "firstValueFrom (RXJS)",
        "category": "Angular",
        "updatedAt": "2023-04-01",
        "paragraphs": ["Convierte un observable en una promesa."],
        "image": { "src": "https://ejemplo.com/imagen.png", "alt": "Descripción" },
        "links": [{ "title": "Documentación", "url": "https://rxjs.dev" }]
      }
    ]
  }
}
</script>
[ng-component]
```

El tipo `glossary` está registrado en `COMPONENT_REGISTRY` (`dynamic-content.component.ts`) con el input `glossary`. Hay ejemplos completos en `docs/glossary/` y en `ejemplo-print-code.txt`.

## Uso en plantillas

```html
<app-glossary [glossary]="miGlosario"></app-glossary>
```

## i18n

Claves en `src/assets/i18n/{es,en,fr}.json`: `Glosario`, `Glosario_sin_resultados`, `Glosario_todos`, `Glosario_indice`, `Glosario_enlace`, `Glosario_limpiar` y `Buscar`. El contenido de los términos no se traduce: llega ya en el idioma del post.

## Tests

`glossary.component.spec.ts` cubre orden, textos en cadena y en `TextModel`, JSON vacío, alternancia e imagen, búsqueda y resaltado, índice A–Z, anclas, fragmento de URL, enlaces y el render a través de `DynamicContentComponent`. Ejecutar con `npm test`.
