/** Fragmento del DTO de un post en la REST API de WordPress (`/wp/v2/posts`). */

export interface WpRenderedField {
  rendered: string;
  protected?: boolean;
}

export interface WpAuthorDto {
  name?: string;
  slug?: string;
}

export interface WpEmbeddedDto {
  author?: WpAuthorDto[];
}

export interface WpPostDto {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: WpRenderedField;
  content: WpRenderedField;
  excerpt: WpRenderedField;
  _embedded?: WpEmbeddedDto;
}
