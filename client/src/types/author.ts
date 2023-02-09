import { IBlog } from './blog';

export interface IAuthor {
  userId: string;
  name: string;
  email: string;
  blogs?: IBlog[];
}
