import { IBlog } from './blog';
import { IUser } from './user';

export type IAuthor = IUser & {
  blogs?: IBlog[];
};
