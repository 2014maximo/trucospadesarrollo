# Especificación: `ImageAdapterComponent`

Componente compartido que muestra una imagen con zoom en modal. Toda la configuración se pasa con un único objeto **`ImageAdapterModel`** (`src/app/shared/models/image-adapter.model.ts`).

## Modelo `ImageAdapterModel`

| Campo | Tipo | Por defecto | Descripción |
|-------|------|-------------|-------------|
| `src` | `string` | `''` | URL o ruta bajo `assets/`. Si está vacío, el componente **no renderiza** nada. |
| `alt` | `string` | `''` | Texto alternativo (accesibilidad). |
| `width` | `string` | `'auto'` | Ancho CSS de la imagen principal. En `type-B` defaultea a `'100%'` si queda en `'auto'`. |
| `height` | `string` | `'auto'` | Alto CSS. |
| `objectFit` | `'contain' \| 'cover' \| ...` | `'contain'` | `object-fit` de la imagen (solo `type-A`). |
| `borderRadius` | `string` | `'0'` | Radio de borde (solo `type-A`). |
| `showZoomIcon` | `boolean` | `true` | Muestra el botón para abrir el modal (solo `type-A`). |
| `zoomIconPosition` | `'top-right' \| ...` | `'top-right'` | Posición del icono de zoom (solo `type-A`). |
| `customClass` | `string` | `''` | Clases en el host del componente (p. ej. `img-fluid`). |
| `typeImage` | `'type-A' \| 'type-B'` | `'type-A'` | Modo de visualización. `type-A`: imagen con zoom + modal. `type-B`: imagen con marco `.bord` + crédito (estática, sin modal). |
| `creditUrl` | `string` | `''` | URL del `<a>` de crédito (solo `type-B`). Si está vacío, no se renderiza el enlace. |
| `creditText` | `string` | `''` | Texto del `<small>` de crédito (solo `type-B`). |
| `creditTarget` | `string` | `'_blank'` | Atributo `target` del enlace de crédito (solo `type-B`). |
| `creditClasses` | `string` | `'f-open-sans-c c7'` | Clases del `<small>` de crédito (solo `type-B`). |

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

### Modo `type-B` (imagen con marco + crédito)

Renderiza la imagen dentro de un wrapper `.bord` con la clase `.marcoFoto` y, opcionalmente, un enlace de crédito debajo. **No** abre modal: es estática.

```typescript
fotoCreditada: ImageAdapterModel = Object.assign(new ImageAdapterModel(), {
  src: 'assets/img/posts/busqueda-empleo.jpg',
  alt: 'Predisposición en la búsqueda de empleo',
  typeImage: 'type-B',
  creditUrl: 'https://unsplash.com/',
  creditText: 'Jeremy Bishop - Unsplash'
});
```

```html
<app-image-adapter [image]="fotoCreditada"></app-image-adapter>
```

> Notas: `.bord` es global (`src/styles.css`); `.marcoFoto` está autocircuito en el CSS del componente. En `type-B`, `width` defaultea a `'100%'` si se deja en `'auto'`.

## Integración con `BlockTextModel`

`GroupBlockTextModel` incluye `image?: ImageAdapterModel`. En plantilla:

```html
<app-image-adapter *ngIf="blocks.image?.src" [image]="blocks.image!"></app-image-adapter>
```

El `*ngIf` evita instancias vacías cuando no hay imagen en ese bloque.

## Pruebas unitarias

- Ejecutar: `npm test`.
- El spec del componente (`image-adapter.component.spec.ts`) comprueba que sin `src` no hay `<img>`, que con un `ImageAdapterModel` completo se enlazan `src`, `alt` y `customClass` en el host, y los comportamientos de `type-B` (`.marcoFoto` con `src`/`alt`, crédito `<a>`/`<small>`, ausencia de icono de zoom).

## Qué no hacer

- No pasar propiedades sueltas (`[src]`, `[alt]`, etc.) al selector: la API única es **`[image]`**.
- No duplicar lógica de modal en el padre; el zoom y el cierre con overlay los gestiona el propio `ImageAdapterComponent`.
