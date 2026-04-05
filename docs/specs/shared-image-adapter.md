# Especificación: `ImageAdapterComponent`

Componente compartido que muestra una imagen con zoom en modal. Toda la configuración se pasa con un único objeto **`ImageAdapterModel`** (`src/app/shared/models/image-adapter.model.ts`).

## Modelo `ImageAdapterModel`

| Campo | Tipo | Por defecto | Descripción |
|-------|------|-------------|-------------|
| `src` | `string` | `''` | URL o ruta bajo `assets/`. Si está vacío, el componente **no renderiza** nada. |
| `alt` | `string` | `''` | Texto alternativo (accesibilidad). |
| `width` | `string` | `'auto'` | Ancho CSS de la imagen principal. |
| `height` | `string` | `'auto'` | Alto CSS. |
| `objectFit` | `'contain' \| 'cover' \| ...` | `'contain'` | `object-fit` de la imagen. |
| `borderRadius` | `string` | `'0'` | Radio de borde. |
| `showZoomIcon` | `boolean` | `true` | Muestra el botón para abrir el modal. |
| `zoomIconPosition` | `'top-right' \| ...` | `'top-right'` | Posición del icono de zoom. |
| `customClass` | `string` | `''` | Clases en el host del componente (p. ej. `img-fluid`). |

## Uso en plantillas

Importar el componente standalone e inyectar el modelo:

```typescript
import { ImageAdapterComponent } from 'src/app/shared/components/image-adapter/image-adapter.component';
import { ImageAdapterModel } from 'src/app/shared/models/image-adapter.model';

@Component({
  // ...
  imports: [ImageAdapterComponent],
})
export class MiComponente {
  foto: ImageAdapterModel = Object.assign(new ImageAdapterModel(), {
    src: 'assets/img/ejemplo.png',
    alt: 'Descripción',
    customClass: 'img-fluid',
  });
}
```

```html
<app-image-adapter [image]="foto"></app-image-adapter>
```

También puedes construir el objeto en línea si no necesitas reutilizarlo:

```html
<app-image-adapter
  [image]="{
    src: 'assets/img/ejemplo.png',
    alt: 'Descripción',
    customClass: 'img-fluid'
  }"
></app-image-adapter>
```

(Angular infiere el objeto; para valores por defecto completos suele ser más claro usar `Object.assign(new ImageAdapterModel(), { ... })` en la clase.)

## Integración con `BlockTextModel`

`GroupBlockTextModel` incluye `image?: ImageAdapterModel`. En plantilla:

```html
<app-image-adapter *ngIf="blocks.image?.src" [image]="blocks.image!"></app-image-adapter>
```

El `*ngIf` evita instancias vacías cuando no hay imagen en ese bloque.

## Pruebas unitarias

- Ejecutar: `npm test`.
- El spec del componente (`image-adapter.component.spec.ts`) comprueba que sin `src` no hay `<img>` y que con un `ImageAdapterModel` completo se enlazan `src`, `alt` y `customClass` en el host.

## Qué no hacer

- No pasar propiedades sueltas (`[src]`, `[alt]`, etc.) al selector: la API única es **`[image]`**.
- No duplicar lógica de modal en el padre; el zoom y el cierre con overlay los gestiona el propio `ImageAdapterComponent`.
