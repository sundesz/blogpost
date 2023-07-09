export type rateType = 1 | 2 | 3 | 4 | 5;

export interface Rating {
  ratingId: string;
  rating: number;
}

export interface BlogRatingAttributes {
  rating1: number;
  rating2: number;
  rating3: number;
  rating4: number;
  rating5: number;
}
