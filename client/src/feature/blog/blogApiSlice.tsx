import { apiSlice } from '../../app/api/apiSlice';
import {
  IBlog,
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
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage-with-typescript#typing-query-and-mutation-endpoints
      transformResponse: (responseData: IBlogResponse) => {
        const { thumbsUp, wow, heart, ...blog } = responseData;
        const reaction: IReaction = {
          thumbsUp: thumbsUp ? Number(thumbsUp) : 0,
          wow: wow ? Number(wow) : 0,
          heart: heart ? Number(heart) : 0,
        };

        return { ...(blog as IBlog), reaction };
      },

      providesTags: ['Blog'],
    }),

    createBlog: builder.mutation<IBlog, ICreateUpdateBlogParams>({
      query: (newBlog) => ({
        url: `/blogs`,
        method: 'POST',
        body: {
          title: newBlog.title,
          content: newBlog.content,
          userId: newBlog.author,
          published: newBlog.published,
        },
      }),
      invalidatesTags: ['Blogs'],
    }),

    updateBlog: builder.mutation<IBlog, ICreateUpdateBlogParams>({
      query: (updateBlog) => ({
        url: `/blogs/${updateBlog.blogId}`,
        method: 'PUT',
        body: {
          title: updateBlog.title,
          content: updateBlog.content,
          userId: updateBlog.author,
          published: updateBlog.published,
        },
      }),
      invalidatesTags: ['Blog'],
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
