# Especificación: `PrintCodeComponent`

Componente compartido (`app-print-code`) para mostrar bloques de código resaltados con sintaxis (vía [PrismJS](https://prismjs.com/)), bloques de terminal (Linux/Windows) o código "transparente" sin la caja de lenguaje. Portado desde el proyecto `blog` y adaptado a standalone components de Angular 19 y a SSR (Angular Universal).

## Librería utilizada

El resaltado de sintaxis lo hace **PrismJS**, que ya es una dependencia del proyecto (`prismjs` en `package.json`, instalado con `pnpm`). El componente carga el core y los lenguajes que necesita mediante imports de efecto:

```typescript
import 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-cshtml';
```

Si se necesita resaltar un lenguaje adicional (por ejemplo `prism-bash` o `prism-json`), se añade un import análogo en `print-code.component.ts` — **no** hace falta instalar un paquete nuevo, los lenguajes son submódulos de `prismjs`, que ya está en `node_modules`. Solo instala con pnpm (`pnpm add <paquete>`) si en el futuro se necesitara una librería que hoy no es dependencia del proyecto.

`Prism.highlightAll()` solo se ejecuta en navegador (`isPlatformBrowser`), porque Prism necesita el DOM y este proyecto renderiza también en servidor (SSR). Si se usa el componente en una página con SSR, el marcado se muestra sin resaltar durante el render de servidor y se resalta al hidratarse en el cliente.

## Modelo `CodeModel`

`src/app/shared/models/print-code.model.ts`

| Campo | Tipo | Por defecto | Descripción |
|-------|------|-------------|-------------|
| `code` | `string` | `''` | Línea de código/comando a mostrar (usado en `tipoCode` `linux`/`windows`). |
| `mostrarRuta` | `boolean` | `false` | Si se muestra el prompt (`user-dev@user-dev:~$` o la ruta de Windows) antes del código. |
| `textRuta` | `string` | — | Texto de la ruta a mostrar en Windows cuando `mostrarRuta` es `true`. |

## Inputs del componente

| Input | Tipo | Por defecto | Descripción |
|-------|------|-------------|-------------|
| `tipoCode` | `'lenguajes' \| 'linux' \| 'windows' \| 'transparente'` | `'lenguajes'` | Variante visual a renderizar. |
| `code` | `string` | `''` | Código fuente completo (modos `lenguajes` y `transparente`). |
| `ObjectCode` | `CodeModel[]` | `[]` | Líneas de comandos (modos `linux` y `windows`). |
| `lenguaje` | `string` | `''` | Nombre del lenguaje para Prism (`language-{{lenguaje}}`) y para la clase de color de la etiqueta (`bg-{{Lenguaje}}`, con mayúscula inicial). |
| `categoriaCorta` | `string` | `''` | Texto corto mostrado en la etiqueta de lenguaje (p. ej. `'TS'`, `'TERMINAL'`). |
| `lineas` | `number` | `0` | Cantidad de líneas de numeración a pintar en el margen izquierdo (modo `lenguajes`). |
| `colorTextoBase` | `string` | `''` | Clase CSS adicional para el color de texto del bloque. |
| `refDocumentacion` | `string` | `''` | URL opcional; si se define, muestra un botón que abre esa documentación en una pestaña nueva. |
| `urlStackBlitz` | `string` | `''` | URL opcional; si se define, muestra un botón que abre un StackBlitz en una pestaña nueva. |

## Uso: bloque de código con lenguaje (`tipoCode="lenguajes"`)

```typescript
import { PrintCodeComponent } from 'src/app/shared/components/print-code/print-code.component';

@Component({
  // ...
  imports: [PrintCodeComponent],
})
export class MiComponente {
  miCodigo = `export class Ejemplo {\n  valor = 1;\n}`;
}
```

```html
<app-print-code
  [code]="miCodigo"
  [lenguaje]="'typescript'"
  [categoriaCorta]="'TS'"
  [lineas]="3"
  [colorTextoBase]="'text-light'"
  [refDocumentacion]="'https://www.typescriptlang.org/docs/'"
  [urlStackBlitz]="'https://stackblitz.com/'">
</app-print-code>
```

Las clases `bg-Typescript`, `bg-Java`, `bg-Css`, `bg-Dart`, `bg-Kotlin`, etc. (color de la etiqueta del lenguaje) ya existen en `src/styles.css`; si se usa un lenguaje nuevo hay que añadir su clase `bg-<Lenguaje>` (con la primera letra en mayúscula) para que la etiqueta tenga color.

## Uso: comandos de terminal (`tipoCode="linux"` o `"windows"`)

```typescript
import { CodeModel } from 'src/app/shared/models/print-code.model';

instalarDependencia: CodeModel[] = [
  Object.assign(new CodeModel(), { mostrarRuta: true, code: 'pnpm add prismjs' })
];
```

```html
<app-print-code
  [tipoCode]="'linux'"
  [ObjectCode]="instalarDependencia">
</app-print-code>
```

Para Windows, además de `code`, se puede usar `textRuta` para mostrar la ruta del `cmd`/PowerShell antes del comando:

```typescript
comandoWindows: CodeModel[] = [
  Object.assign(new CodeModel(), {
    mostrarRuta: true,
    textRuta: 'C:\\proyectos\\mi-app>',
    code: 'pnpm install'
  })
];
```

```html
<app-print-code [tipoCode]="'windows'" [ObjectCode]="comandoWindows"></app-print-code>
```

## Uso: bloque transparente (`tipoCode="transparente"`)

Igual que `lenguajes` pero sin la caja oscura ni la etiqueta de lenguaje — útil para incrustar un fragmento de código dentro de otro layout.

```html
<app-print-code
  [tipoCode]="'transparente'"
  [code]="miCodigo"
  [lenguaje]="'typescript'">
</app-print-code>
```

## Copiar al portapapeles

El botón verde (o, en los modos `linux`/`windows`, el botón de la barra superior) copia al portapapeles el valor de `code`, o si no hay `code`, el `code` del primer elemento de `ObjectCode`. Usa `copiarAlPortapapeles` de `@shared/global-functions`.

## Integración con `ColumnsBlocks` (`BlockContentModel`)

`ColumnsBlocks` incluye `printCode?: PrintCodeModel`. `BlockContentComponent` renderiza `<app-print-code>` automáticamente cuando ese campo está presente:

```typescript
import { PrintCodeModel } from 'src/app/shared/models/print-code.model';

columna: ColumnsBlocks = {
  printCode: Object.assign(new PrintCodeModel(), {
    code: miCodigo,
    lenguaje: 'typescript',
    categoriaCorta: 'TS',
    lineas: 3
  })
};
```

Esto también permite incrustar un bloque de código desde contenido dinámico de WordPress — ver [block-content-wordpress.md](../block-content-wordpress.md#bloque-de-código-printcode).

## Qué no hacer

- No pasar `ObjectCode` vacío junto con `code` vacío: el componente necesita al menos uno de los dos para poder copiar al portapapeles.
- No olvidar añadir el import de `prismjs/components/prism-<lenguaje>` correspondiente si se usa un lenguaje nuevo en `[lenguaje]`; sin ese import, Prism no resalta ese lenguaje (pero el código se sigue mostrando sin colorear).
- No llamar `Prism.highlightAll()` manualmente desde fuera del componente: ya se invoca en `ngOnInit` (solo en navegador).
