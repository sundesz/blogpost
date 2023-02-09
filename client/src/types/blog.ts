import { IAuthor } from './author';
import { IComment } from './comment';
import { IReaction } from './reaction';

export interface IBlogResponse {
  blogId: string;
  title: string;
  content: string;
  slug: string;
  updatedAt?: string;
  thumbsUp?: number;
  wow?: number;
  heart?: number;
}

export interface IBlog {
  blogId: string;
  title: string;
  content: string;
  slug: string;
  updatedAt?: string;
  user: IAuthor;
  reaction: IReaction;
  comments: IComment[];
}

export interface ICreateUpdateBlogParams {
  blogId?: string;
  title: string;
  content: string;
  slug: string;
  author?: string;
  published: boolean;
}

export type BlogCRUDType = 'create' | 'update';
