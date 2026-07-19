# Index Buttons - Uso en WordPress

## Descripción

El componente `index-buttons` muestra una interfaz interactiva con categorías de recursos. Cada categoría tiene botones con estilos personalizados (color, rotación, fuente) y al hacer clic muestra un slider con los recursos de esa categoría.

## Cómo usarlo en WordPress

### Para Posts (`post-base`)

1. Edita un post en WordPress
2. Agrega un bloque **"HTML personalizado"**
3. Pega el siguiente código:

```html
<script type="application/json">
{
  "type": "index-buttons",
  "data": [
    {
      "id": "categoria-1",
      "name": "Nombre Categoría 1",
      "individualStyle": {
        "backgroundColor": "bg-Developer",
        "textColor": "text-white",
        "fontFamily": "fuenteSeis",
        "fontSize": "fs-30",
        "rotation": "rot-1"
      },
      "resources": [
        {
          "title": "Título del Recurso",
          "description": "Descripción del recurso",
          "ImgSlider": {
            "alt": "Texto alternativo",
            "src": "https://tu-wordpress.com/wp-content/uploads/imagen.png",
            "height": 60,
            "width": 0
          },
          "url": "https://ejemplo.com"
        }
      ]
    }
  ]
}
</script>
[ng-component]
```

### Para Páginas de Categoría (`category-base`)

El mismo formato se puede usar en el contenido de una página de categoría. El componente se renderizará dentro del contenido dinámico.

## Estructura del JSON

### Campos principales

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `type` | string | Debe ser `"index-buttons"` |
| `data` | array | Array de categorías |

### Categoría (elemento de `data`)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador único de la categoría |
| `name` | string | Nombre visible del botón |
| `individualStyle` | object | Estilos personalizados |
| `resources` | array | Recursos de la categoría |

### `individualStyle`

| Campo | Tipo | Valores posibles |
|-------|------|------------------|
| `backgroundColor` | string | `bg-Developer`, `bg-Android`, `bg-Electron`, `bg-Dart`, `bg-Linux`, `bg-Kotlin`, `bg-Kubernetes`, `bg-Angular`, `bg-Javascript`, `bg-Java`, `bg-Html`, `bg-Net`, `bg-Ionic`, `bg-React`, `bg-Sql`, `bg-Db`, `bg-white`, `bg-White` |
| `textColor` | string | `text-white`, `text-dark` |
| `fontFamily` | string | `fuenteSeis`, `fuenteOcho`, etc. |
| `fontSize` | string | `fs-30`, `fs-20`, etc. |
| `rotation` | string | `rot-1`, `rot-2`, `rot-3`, `post-z` |

### Recurso (elemento de `resources`)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `title` | string | Título del recurso |
| `description` | string | Descripción del recurso |
| `ImgSlider` | object | Imagen del recurso |
| `url` | string | URL externa del recurso |

### `ImgSlider`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `alt` | string | Texto alternativo de la imagen |
| `src` | string | URL de la imagen (puede ser de WordPress Media Library) |
| `height` | number | Altura en píxeles |
| `width` | number | Ancho en píxeles (0 para automático) |

## Ejemplo completo

Ver archivo `index-buttons-wordpress-example.json` para un ejemplo completo con múltiples categorías y recursos.

## Notas

- Las imágenes pueden subirse al Media Library de WordPress y usar la URL completa
- El `id` de cada categoría debe ser único
- Los estilos deben usar las clases CSS predefinidas del proyecto
- El componente es responsivo y funciona en móviles
