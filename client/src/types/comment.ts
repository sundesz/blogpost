export interface IComment {
  commentId: string;
  blogId: string;
  userId: string | null;
  title: string;
  content: string;
  updatedAt?: string;
}

export interface ICreateUpdateCommentParams {
  commentId?: string;
  blogId?: string;
  title: string;
  content: string;
  published?: boolean;
  passive?: boolean;
}
