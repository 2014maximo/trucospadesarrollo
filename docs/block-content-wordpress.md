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
}

interface RowBlocks {
  initialStyle?: string;      // Clases de Bootstrap (ej: "col-md-3", "col-md-8")
  columns?: ColumnsBlocks[];
}

interface ColumnsBlocks {
  title?: TextModel;
  subtitle?: TextModel;
  paragraph?: TextModel[];
  image?: ImageAdapterModel;
}

interface TextModel {
  text?: string;
  styleText?: string;         // Clases CSS para el texto
}
```

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
