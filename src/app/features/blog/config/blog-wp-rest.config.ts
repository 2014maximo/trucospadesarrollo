/**
 * URL base del REST API de WordPress Headless, **sin barra final**.
 *
 * Ejemplo: `https://tudominio.com/wp-json/wp/v2`
 *
 * Si está vacío, `BlogContentService` no realizará peticiones HTTP; el
 * componente `PostBaseComponent` mostrará el mensaje i18n `BLOG_POST_BASE.noApi`.
 */
export const BLOG_WP_REST_BASE_URL = '';
