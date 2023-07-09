import { apiSlice } from '../../app/api/apiSlice';
import { PROFILE_IMAGE } from '../../config';
import {
  Blog,
  BlogRatingAttributes,
  BlogResponse,
  CreateUpdateBlogParams,
  GetAllRequestQuery,
  PaginationResponse,
  Reaction,
  UpdateReactionParams,
} from '../../types';

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlog: builder.query<PaginationResponse<Blog>, GetAllRequestQuery>({
      query: ({ page, orderBy, orderDir, filterName, filterValue }) => ({
        url: `blogs?page=${page}&orderBy=${orderBy}&orderDir=${orderDir}&columnName=${filterName}&columnValue=${filterValue}`,
      }),
      transformResponse: (responseData: PaginationResponse<Blog>) => {
        const { data, ...rest } = responseData;
        const dataWithProfilePic: Blog[] = data.map((blog) => {
          const profilePic = blog.User.imageId
            ? `${PROFILE_IMAGE}/${blog.User.userId}.png`
            : null;

          const { User, ...restBlog } = blog;
          return { ...restBlog, User: { ...User, profilePic } };
        });

        return { ...rest, data: dataWithProfilePic };
      },
      providesTags: ['Blogs'],
    }),

    getBlog: builder.query<Blog, string>({
      query: (blogSlug) => ({
        url: `/blogs/${blogSlug}`,
      }),
      // https://redux-toolkit.js.org/rtk-query/usage-with-typescript#typing-query-and-mutation-endpoints
      transformResponse: (responseData: BlogResponse) => {
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

        const reaction: Reaction = {
          thumbsUp: thumbsUp ?? 0,
          wow: wow ?? 0,
          heart: heart ?? 0,
        };

        const blogRating: BlogRatingAttributes = {
          rating1: rating1 ?? 0,
          rating2: rating2 ?? 0,
          rating3: rating3 ?? 0,
          rating4: rating4 ?? 0,
          rating5: rating5 ?? 0,
        };
        return { ...blog, reaction, blogRating };
      },

      providesTags: ['Blog'],
    }),

    createBlog: builder.mutation<string, CreateUpdateBlogParams>({
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

    updateBlog: builder.mutation<string, CreateUpdateBlogParams>({
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

    updateReaction: builder.mutation<Blog, UpdateReactionParams>({
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
