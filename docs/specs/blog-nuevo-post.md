# Especificación: nuevo post en el blog

Documento canónico para humanos, revisores y agentes (Cursor, CLI, otros IDE).  
Mantener este archivo actualizado cuando cambie el flujo.

## Contexto del producto

- Framework: **Angular 19**.
- Contenido del blog bajo `src/app/features/blog/`: categorías, constantes de posts, componentes de publicación y rutas lazy.
- Traducciones con **ngx-translate** en `src/assets/i18n/`. Hoy existen **es**, **en** y **fr**; al añadir idiomas, replicar las claves nuevas en cada archivo JSON añadido.

## Requisitos funcionales (checklist)

1. **Tema y SEO**  
   Definir título y enfoque buscable. Las claves de i18n y `referenciaBusqueda` deben ser coherentes con eso.

2. **Componente del post**  
   Crear el componente en la carpeta de la categoría correspondiente (convención actual del repo), por ejemplo:

   ```bash
   ng g c features/blog/posts/developer/mi-post --standalone
   ```

   Ajustar `--standalone` según el patrón ya usado en esa carpeta (el CLI del proyecto ya genera según `angular.json`).

3. **Metadatos en la constante de categoría**  
   En `src/app/features/blog/constants/posts/posts-<categoria>.constant.ts` (o archivo equivalente si el nombre tiene otro sufijo en el repo), añadir una entrada `DatosPost` con:
   - `id`: UUID versión 4 único en todo el blog.
   - Claves `nombre`, `descripcion`, `descripcionCorta`, `referenciaBusqueda`, fechas, imágenes y demás campos según ejemplos existentes en el mismo archivo.
   - `ruta` y `componente` alineados con la ruta del router y el nombre de la clase exportada del componente.

   **UUID:** puede generarse con cualquier herramienta válida RFC 4122 v4, por ejemplo:
   - En la consola del navegador: `crypto.randomUUID()`
   - En Linux: `uuidgen`
   - En Node.js: `node -e "console.log(crypto.randomUUID())"`

   No es obligatorio usar un sitio web concreto; lo importante es unicidad y formato estándar.

4. **Rutas**  
   Registrar el segmento en el `*.routes.ts` de la categoría (por ejemplo `src/app/features/blog/posts/developer/developer.routes.ts`), con `loadComponent` apuntando al componente nuevo. El `path` debe coincidir con la URL deseada y con `DatosPost.ruta` donde aplique la convención del proyecto.

5. **Categoría en el índice (si aplica)**  
   Si el post debe listarse en una categoría ya definida en `src/app/features/blog/constants/categories.constant.ts`, comprobar que el arreglo de esa categoría incluye la nueva entrada o que la fuente de datos que use la UI la expone. No duplicar fuentes de verdad: metadatos en constantes + rutas + i18n deben estar sincronizados.

6. **Traducciones (obligatorio: es, en, fr actuales)**  
   Añadir todas las claves nuevas en:
   - `src/assets/i18n/es.json`
   - `src/assets/i18n/en.json`
   - `src/assets/i18n/fr.json`

   Para idiomas futuros: añadir el mismo conjunto de claves en cada nuevo archivo bajo `src/assets/i18n/` siguiendo la configuración del loader de la app.

7. **Pruebas unitarias**  
   Si el cambio incluye un componente generado con spec, mantener el archivo `*.spec.ts` en verde:
   - Ejecutar: `npm test` (equivale a `ng test`).
   - Corregir imports, providers (`TranslateModule`, `HttpClient`, etc.) y expectativas mínimas para que compile y pasen las pruebas relevantes.

8. **Revisión manual**  
   Revisar el post en local (`ng serve`), navegación, textos y enlaces.

9. **Publicación**  
   Commit y despliegue según el flujo del repositorio.

## Referencias de código

- Modelo de metadatos: `src/app/features/blog/models/categorias.model.ts` (`DatosPost`).
- Rutas del blog: `src/app/features/blog/blog.routes.ts` y rutas por categoría bajo `src/app/features/blog/posts/`.
- Guía breve legacy en el repo (redirige aquí): `src/app/features/blog/posts/extructure-post.md`.
