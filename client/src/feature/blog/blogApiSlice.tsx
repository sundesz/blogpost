import { apiSlice } from '../../app/api/apiSlice';
import {
  IBlog,
  IBlogRating,
  IBlogResponse,
  ICreateUpdateBlogParams,
  IReaction,
  IUpdateReactionParams,
} from '../../types';

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlog: builder.query<IBlog[], void>({
      query: () => '/blogs',
      providesTags: ['Blogs'],
    }),

    getBlog: builder.query<IBlog, string>({
      query: (blogSlug) => ({
        url: `/blogs/${blogSlug}`,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage-with-typescript#typing-query-and-mutation-endpoints
      transformResponse: (responseData: IBlogResponse) => {
        const {
          thumbsUp,
          wow,
          heart,
          rating1,
          rating2,
          rating3,
          rating4,
          rating5,
          ...blog
        } = responseData;

        const reaction: IReaction = {
          thumbsUp: thumbsUp ?? 0,
          wow: wow ?? 0,
          heart: heart ?? 0,
        };

        const blogRating: IBlogRating = {
          rating1: rating1 ?? 0,
          rating2: rating2 ?? 0,
          rating3: rating3 ?? 0,
          rating4: rating4 ?? 0,
          rating5: rating5 ?? 0,
        };

        return { ...(blog as IBlog), reaction, blogRating };
      },

      providesTags: ['Blog'],
    }),

    createBlog: builder.mutation<string, ICreateUpdateBlogParams>({
      query: (newBlog) => ({
        url: `/blogs`,
        method: 'POST',
        body: {
          title: newBlog.title,
          slug: newBlog.slug,
          content: newBlog.content,
          userId: newBlog.author,
          published: newBlog.published,
        },
      }),
      invalidatesTags: ['Blogs', 'Authors'],
    }),

    updateBlog: builder.mutation<string, ICreateUpdateBlogParams>({
      query: (updateBlog) => ({
        url: `/blogs/${updateBlog.blogId}`,
        method: 'PUT',
        body: {
          title: updateBlog.title,
          slug: updateBlog.slug,
          content: updateBlog.content,
          userId: updateBlog.author,
          published: updateBlog.published,
        },
      }),

      invalidatesTags: ['Blogs', 'Blog'],
    }),

    updateReaction: builder.mutation<IBlog, IUpdateReactionParams>({
      query: (blog) => ({
        url: `/reactions/${blog.blogId}`,
        method: 'POST',
        body: {
          reactionType: blog.reactionType,
        },
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const {
  useGetAllBlogQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useUpdateReactionMutation,
} = blogApiSlice;
