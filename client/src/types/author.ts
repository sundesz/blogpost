import { Blog } from './blog';
import { User } from './user';

export type Author = User & {
  Blogs?: Blog[];
  blogCount?: number;
  imageId: string;
};

export type AuthorNames = Omit<User, 'email'>;
