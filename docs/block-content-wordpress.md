# Uso de `BlockContentComponent` desde WordPress

Este documento muestra cómo enviar datos estructurados desde WordPress para renderizar el componente `BlockContentComponent` dentro de un post dinámico.

## Formato del bloque en WordPress

En el editor de WordPress, agrega un bloque **HTML personalizado** (Custom HTML, no un bloque de Párrafo) con el siguiente formato. El `<script>` y el marcador `[ng-component]` deben ir **dentro del mismo bloque**, uno justo después del otro:

```html
<script type="application/json" data-component-id="bloque-unico-1">
{
  "type": "block-content",
  "data": [
    {
      "blocks": [
        {
          "initialStyle": "col-md-3",
          "columns": [
            {
              "title": {
                "styleText": "f-bebas fs-200 p-0 m-0 text-light",
                "text": "1"
              },
              "subtitle": {
                "styleText": "f-yanone fs-40 lh-40 text-light p-0 text-uppercase mb-2",
                "text": "PREDISPOSICIÓN"
              },
              "paragraph": [
                {
                  "text": "Antes de decirle al mundo que buscamos empleo, primero hay que saberlo dentro.",
                  "styleText": "fuenteDos c7 fs-18 lh-20"
                },
                {
                  "text": "La sola predisposición termina siendo la mayor fuerza que va a conectar todo."
                }
              ]
            }
          ]
        },
        {
          "initialStyle": "col-md-1"
        },
        {
          "initialStyle": "col-md-8",
          "columns": [
            {
              "image": {
                "src": "https://ejemplo.com/imagen.jpg",
                "alt": "Descripción de la imagen",
                "height": "552",
                "width": "auto",
                "typeImage": "type-B",
                "creditTarget": "_blank",
                "creditUrl": "https://unsplash.com/",
                "creditText": "Fotógrafo - Plataforma",
                "creditClasses": "f-open-sans-c c7"
              }
            }
          ]
        }
      ]
    }
  ]
}
</script>
[ng-component]
```

> **Importante:** el marcador es `[ng-component]`, **sin `id`**. El `<script>` se
> empareja con el `[ng-component]` que le sigue inmediatamente por *posición en
> el texto*, no por un identificador que haya que escribir dos veces. Esto es
> deliberado: cuando el marcador llevaba `id="..."`, WordPress deformaba las
> comillas al guardar (comillas tipográficas, comillas angulares e incluso el
> símbolo de pulgada `&#8243;`) y rompía el emparejamiento. El
> `data-component-id` del `<script>` es opcional y solo sirve para identificar
> el bloque en los `console.warn` de depuración.

## Estructura de datos

El campo `data` debe ser un **array** de objetos `BlockContentModel`:

```typescript
interface BlockContentModel {
  blocks: RowBlocks[];
  rowStyle?: string;          // Clases CSS adicionales para el <div class="row"> de este nivel
}

interface RowBlocks {
  initialStyle?: string;      // Clases de Bootstrap (ej: "col-md-3", "col-md-8")
  columns?: ColumnsBlocks[];
}

interface ColumnsBlocks {
  styleCol?: string;          // Clases CSS para el <div class="row"> de los `blocks` anidados
  title?: TextModel;
  subtitle?: TextModel;
  paragraph?: TextModel[];
  list?: ListModel[];
  image?: ImageAdapterModel;
  blocks?: RowBlocks[];       // Recursivo: columnas anidadas dentro de esta columna
}

interface TextModel {
  text?: string;               // Se renderiza con [innerHTML]: admite <strong>/<b> (negrita), <em>/<i> (cursiva), <br>
  styleText?: string;         // Clases CSS para el texto
  url?: string;               // Si se informa, el texto se renderiza como <a>
  target?: string;            // Target del enlace (por defecto "_blank")
}

interface ListModel {
  type?: 'ordered' | 'unordered';  // 'ordered' → <ol>, 'unordered' → <ul>
  styleList?: string;              // Clases CSS para la lista
  items: TextModel[];
}
```

> `title` y `subtitle` solo se renderizan (`<h4>` / `<h5>`) si están presentes
> en el JSON: una columna sin ellos no genera encabezados vacíos.

## Columnas anidadas (recursividad)

Cualquier elemento de `columns` puede incluir su propio `blocks` para anidar
columnas dentro de una columna. El componente se renderiza a sí mismo de forma
recursiva, envolviendo los `blocks` anidados en un nuevo `<div class="row">`
(al que se le aplican las clases de `styleCol` si se informan):

```html
<script type="application/json" data-component-id="bloque-anidado">
{
  "type": "block-content",
  "data": [
    {
      "blocks": [
        {
          "initialStyle": "col-md-4",
          "columns": [
            {
              "styleCol": "align-items-center",
              "blocks": [
                {
                  "initialStyle": "col-md-4",
                  "columns": [
                    {
                      "image": {
                        "src": "https://ejemplo.com/logo.png",
                        "alt": "Logo",
                        "height": "80",
                        "typeImage": "type-B"
                      }
                    }
                  ]
                },
                {
                  "initialStyle": "col-md-8",
                  "columns": [
                    {
                      "subtitle": {
                        "styleText": "f-yanone fs-20 lh-20 text-light p-0 text-uppercase mb-2",
                        "text": "Texto junto al logo"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
</script>
[ng-component]
```

El anidamiento no tiene límite de profundidad: un `blocks` anidado puede
contener a su vez columnas con otros `blocks`.

## Ejemplo completo con múltiples bloques

Puedes incluir varios bloques en el mismo post:

```html
<!-- Primer bloque -->
<script type="application/json" data-component-id="bloque-1">
{
  "type": "block-content",
  "data": [
    {
      "blocks": [
        {
          "initialStyle": "col-md-6",
          "columns": [
            {
              "title": {
                "styleText": "f-bebas fs-150 text-primary",
                "text": "Sección 1"
              },
              "paragraph": [
                {
                  "text": "Contenido de la primera sección del post."
                }
              ]
            }
          ]
        },
        {
          "initialStyle": "col-md-6",
          "columns": [
            {
              "image": {
                "src": "https://ejemplo.com/imagen-1.jpg",
                "alt": "Imagen 1",
                "height": "400",
                "width": "auto",
                "typeImage": "type-A"
              }
            }
          ]
        }
      ]
    }
  ]
}
</script>
[ng-component]

<p>Contenido HTML normal entre bloques...</p>

<!-- Segundo bloque -->
<script type="application/json" data-component-id="bloque-2">
{
  "type": "block-content",
  "data": [
    {
      "blocks": [
        {
          "initialStyle": "col-md-12",
          "columns": [
            {
              "subtitle": {
                "styleText": "f-yanone fs-50 text-center",
                "text": "Conclusión"
              },
              "paragraph": [
                {
                  "text": "Este es el párrafo final del artículo.",
                  "styleText": "fuenteDos fs-20 lh-28"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
</script>
[ng-component]
```

## Texto en negrita / cursiva dentro de `text`

Cualquier `text` de `title`, `subtitle`, `paragraph` o `list.items` se renderiza
con `[innerHTML]`, así que puedes incrustar etiquetas inline directamente en el
JSON:

```json
{
  "text": "Antes de decirle al mundo que <strong>buscamos empleo</strong>, primero hay que saberlo dentro."
}
```

- Usa `<strong>` o `<b>` para negrita, `<em>` o `<i>` para cursiva, `<br>` para
  saltos de línea.
- El sanitizador HTML de Angular limpia automáticamente cualquier etiqueta o
  atributo no seguro (por ejemplo `<script>` o `onclick`), así que no hace
  falta escapar nada extra ni preocuparse por XSS: solo se conservan las
  etiquetas de formato inline habituales.

## Notas importantes

1. **Sin IDs que sincronizar**: el marcador es siempre `[ng-component]`, sin `id`. Cada `<script>` se empareja automáticamente con el `[ng-component]` que le sigue — no hay nada que deba coincidir entre los dos.
2. **JSON válido, pero con margen de error**: usa comillas dobles en claves y valores string, sin comentarios `//` ni comas colgantes. Si aun así te queda una coma colgante o alguna clave sin comillas (típico al copiar el mock de TypeScript), el parser intenta corregirlo automáticamente antes de rendirse.
3. **Campos opcionales**: Todos los campos dentro de `columns` son opcionales. Puedes usar solo `title`, solo `image`, o cualquier combinación.
4. **`data-component-id` es opcional**: solo sirve para identificar el bloque en los mensajes de `console.warn` si algo falla — no participa del emparejamiento.

## Solución de problemas

Si publicas el bloque en WordPress y `app-block-content` no aparece en el post:

1. **Verifica que el `<script>` sobrevivió al guardado.** WordPress sanea el HTML
   al guardar (`content_save_pre` → `wp_filter_post_kses`) si el usuario que edita
   **no tiene la capacidad `unfiltered_html`**. Por defecto solo los
   Administradores en instalación *single-site* la tienen (en Multisite, nadie la
   tiene salvo que se habilite explícitamente). Si el autor del post no es
   Administrador, o el sitio es Multisite, el `<script type="application/json">`
   se elimina silenciosamente al guardar y nunca llega al campo `content` del
   GraphQL. Para confirmarlo, consulta el post vía GraphQL y revisa si el
   `<script>` sigue presente:
   ```bash
   curl -s -X POST https://api.trucospadesarrollo.com/graphql \
     -H "Content-Type: application/json" \
     -d '{"query":"query($slug:String!){ posts(where:{name:$slug}) { nodes { content } } }","variables":{"slug":"tu-slug"}}'
   ```
   Si no ves el `<script>` en la respuesta, el problema es de permisos de
   WordPress, no del componente Angular.
2. **Usa el bloque "HTML personalizado" (Custom HTML), no un bloque de Párrafo.**
   Si pegas el snippet en un bloque de Párrafo, Gutenberg escapa las etiquetas
   como texto plano. El `<script>` y el `[ng-component]` deben ir
   **dentro del mismo bloque HTML personalizado**, uno justo después del otro.
3. **wpautop puede separar el script del marcador.** Si por algún motivo quedan
   en bloques distintos, WordPress puede envolver el marcador en su propio
   `<p class="wp-block-paragraph">[ng-component]</p>`. El parser
   (`DynamicContentComponent.stripWpArtifacts`) ya normaliza este envoltorio
   automáticamente, pero es más robusto mantenerlos en el mismo bloque HTML.
4. **Revisa la consola del navegador.** `DynamicContentComponent` loguea con
   `console.warn` el JSON exacto y el error de `JSON.parse` cuando no logra
   resolver un bloque, o cuando el `type` del JSON no está registrado en
   `COMPONENT_REGISTRY` (`src/app/shared/components/dynamic-content/dynamic-content.component.ts`).

## Ver también

- [Especificación de contenido headless](blog-headless-content.md)
- [Modelo de datos](../src/app/shared/models/block-content.model.ts)
- [Componente de imagen](shared-image-adapter.md)
