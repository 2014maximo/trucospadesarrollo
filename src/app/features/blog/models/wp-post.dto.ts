/** DTO de la API GraphQL de WordPress (sin campos ACF). */

// ── Posts ────────────────────────────────────────────────────────────────────

export interface WpGraphqlCategoryEdgeNode {
  id: string;
  name: string;
}

export interface WpGraphqlCategoryEdge {
  node: WpGraphqlCategoryEdgeNode;
}

export interface WpGraphqlCategories {
  edges: WpGraphqlCategoryEdge[];
}

export interface WpGraphqlFeaturedImageNode {
  sourceUrl: string;
}

export interface WpGraphqlFeaturedImage {
  node: WpGraphqlFeaturedImageNode;
}

export interface WpGraphqlPostNode {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  uri: string;
  authorId?: string;
  categories?: WpGraphqlCategories;
  featuredImage?: WpGraphqlFeaturedImage;
}

export interface WpGraphqlPosts {
  nodes: WpGraphqlPostNode[];
}

export interface WpGraphqlData {
  posts: WpGraphqlPosts;
}

export interface WpGraphqlResponse {
  data: WpGraphqlData;
}

// ── Pages (categorías headless) ──────────────────────────────────────────────

export interface WpGraphqlPageNode {
  id: string;
  title: string;
  content: string;
  slug?: string;
  uri?: string;
}

export interface WpGraphqlPages {
  edges: { node: WpGraphqlPageNode }[];
}

export interface WpGraphqlPagesData {
  pages: WpGraphqlPages;
}

export interface WpGraphqlPagesResponse {
  data: WpGraphqlPagesData;
}
