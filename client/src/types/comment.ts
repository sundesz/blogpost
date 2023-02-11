import { IRating } from './rating';
import { IUser } from './user';

export interface IComment {
  commentId: string;
  blogId: string;
  title: string;
  content: string;
  updatedAt?: string;
  user: IUser | null;
  rating: IRating | null;
}

export interface ICreateUpdateCommentParams {
  commentId?: string;
  blogId?: string;
  title: string;
  content: string;
  rating: number;
  published?: boolean;
  passive?: boolean;
}
