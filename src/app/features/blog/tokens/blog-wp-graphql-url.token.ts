import { InjectionToken } from '@angular/core';
import { BLOG_WP_GRAPHQL_URL } from '../config/blog-wp-graphql.config';

/** URL base de GraphQL de WordPress. Por defecto toma `BLOG_WP_GRAPHQL_URL`. */
export const BLOG_WP_GRAPHQL_URL_TOKEN = new InjectionToken<string>('BLOG_WP_GRAPHQL_URL_TOKEN', {
  providedIn: 'root',
  factory: () => BLOG_WP_GRAPHQL_URL
});
