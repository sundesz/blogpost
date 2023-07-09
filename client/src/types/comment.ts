import { Rating } from './rating';
import { User } from './user';

export interface Comment {
  commentId: string;
  blogId: string;
  title: string;
  content: string;
  updatedAt?: string;
  user: User | null;
  rating: Rating | null;
}

export interface CreateUpdateCommentParams {
  commentId?: string;
  blogId?: string;
  title: string;
  content: string;
  rating: number;
  published?: boolean;
  passive?: boolean;
}
