/** DTO de un post en la API GraphQL de WordPress. */

export interface WpGraphqlAvatar {
  node?: {
    sourceUrl?: string;
    uri?: string;
  };
}

export interface WpGraphqlLink {
  url?: string;
  title?: string;
  target?: string;
}

export interface WpGraphqlContentAuthorModel {
  autorDelPost?: string;
  introduction?: string;
  fieldGroupName?: string;
  avatar?: WpGraphqlAvatar;
  linkAAutor?: WpGraphqlLink;
  additionalparagraphs?: WpGraphqlAdditionalParagraphs[];
}

export interface WpGraphqlCategoryNode {
  name: string;
}

export interface WpGraphqlCategories {
  nodes: WpGraphqlCategoryNode[];
}

export interface WpGraphqlAdditionalParagraphs {
  fieldGroupName?: string;
  paragraphsmore?: string;
}


export interface WpGraphqlPostNode {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  uri: string;
  postId: number;
  modified: string;
  contentauthormodel?: WpGraphqlContentAuthorModel;
  categories?: WpGraphqlCategories;
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
