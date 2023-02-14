import { apiSlice } from '../../app/api/apiSlice';
import { IAuthor } from '../../types';

export const authorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthor: builder.query<IAuthor, string>({
      query: (authorId) => `/authors/${authorId}`,
      providesTags: ['Author'],
    }),

    getAllAuthor: builder.query<IAuthor[], void>({
      query: () => '/authors',
      providesTags: ['Authors'],
    }),
  }),
});

export const { useGetAuthorQuery, useGetAllAuthorQuery } = authorApiSlice;
