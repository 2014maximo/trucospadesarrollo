import { InjectionToken } from '@angular/core';
import { BLOG_WP_REST_BASE_URL } from '../config/blog-wp-rest.config';

/** URL base del REST API de WordPress (`.../wp-json/wp/v2`). Por defecto toma `BLOG_WP_REST_BASE_URL`. */
export const BLOG_WP_REST_URL = new InjectionToken<string>('BLOG_WP_REST_URL', {
  providedIn: 'root',
  factory: () => BLOG_WP_REST_BASE_URL
});
