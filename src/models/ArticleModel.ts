export interface ArticleModel {
  picture?: string;
  alt?: string
  title?: string;
  description?: string;
  postDate?: string;
  updatedAt?: string;
  link?: string;
  onclick?: () => void;
}