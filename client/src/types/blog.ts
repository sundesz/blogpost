import { IAuthor } from './author';
import { IComment } from './comment';
import { IReaction } from './reaction';
import { IBlogRating } from './rating';
export interface IBlogResponse {
  blogId: string;
  title: string;
  content: string;
  slug: string;
  updatedAt?: string;
  thumbsUp?: number;
  wow?: number;
  heart?: number;
  rating1: number;
  rating2: number;
  rating3: number;
  rating4: number;
  rating5: number;
  user: IAuthor;
  comments: IComment[];
}

export interface IBlog {
  blogId: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  updatedAt?: string;
  user: IAuthor;
  reaction: IReaction;
  comments: IComment[];
  blogRating: IBlogRating;
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
