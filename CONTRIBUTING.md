# Contribución al proyecto

## Enfoque “spec driven”

Antes de implementar cambios sustanciales (nuevos posts, nuevas rutas de blog, cambios en el modelo de datos del blog), consulta la especificación correspondiente en **`docs/specs/`**. Ese directorio es la fuente de verdad compartida entre personas y herramientas (incluidos asistentes de código).

### Especificaciones actuales

- **Nuevo post del blog:** [docs/specs/blog-nuevo-post.md](docs/specs/blog-nuevo-post.md)
- **Imagen con zoom (`app-image-adapter`):** [docs/specs/shared-image-adapter.md](docs/specs/shared-image-adapter.md)

## Stack y estructura

- Angular 19, diseño por features; detalle de carpetas en [README.md](README.md).

## Calidad

- Tras cambios en componentes con pruebas generadas, ejecutar **`npm test`** y dejar los tests en estado correcto.
- Mantener **es**, **en** y **fr** alineados en `src/assets/i18n/` cuando se añadan claves nuevas (véase la spec del blog).

## Asistentes de código (Cursor, otros)

- Archivo de contexto para agentes: [AGENTS.md](AGENTS.md).
- En Cursor, reglas adicionales en `.cursor/rules/` (opcional pero recomendado para quien use este editor).
