export type rateType = 1 | 2 | 3 | 4 | 5;

export interface IRating {
  ratingId: string;
  blogId: string;
  userId: string | null;
  star: number;
  updatedAt?: string;
}
