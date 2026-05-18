import { environment } from '../../../../environments/environment';

/**
 * URL base de GraphQL de WordPress Headless.
 *
 * En desarrollo apunta al proxy local (`/graphql`).
 * En producción usa `environment.graphql` (`https://api.trucospadesarrollo.com/graphql`).
 *
 * Si está vacío, `BlogContentService` no realizará peticiones HTTP.
 */
export const BLOG_WP_GRAPHQL_URL = environment.graphql;
