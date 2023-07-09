import { Author } from './author';
import { Comment } from './comment';
import { Reaction } from './reaction';
import { BlogRatingAttributes } from './rating';
export interface BlogResponse {
  blogId: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  updatedAt?: string;
  thumbsUp?: number;
  wow?: number;
  heart?: number;
  rating1: number;
  rating2: number;
  rating3: number;
  rating4: number;
  rating5: number;
  User: Author;
  Comments: Comment[];
}

export interface Blog {
  blogId: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  updatedAt?: string;
  User: Author;
  reaction: Reaction;
  Comments: Comment[];
  blogRating: BlogRatingAttributes;
}

export interface CreateUpdateBlogParams {
  blogId?: string;
  title: string;
  content: string;
  slug: string;
  author?: string;
  published: boolean;
}

export type BlogCRUDType = 'create' | 'update';
