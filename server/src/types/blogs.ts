export interface IBlog {
  blogId: string;
  userId: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  passive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// defines the type of the object passed to Sequelize’s model.create
export type IBlogInput = Omit<IBlog, 'blogId'>;

export type NewBlogType = Pick<
  IBlog,
  'userId' | 'title' | 'content' | 'published' | 'slug'
>;
export type UpdateBlogType = Pick<
  IBlog,
  'title' | 'content' | 'slug' | 'published' | 'userId'
>;
