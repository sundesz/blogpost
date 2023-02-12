import { apiSlice } from '../../app/api/apiSlice';
import { IAuthor } from '../../types';

export const authorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthor: builder.query<IAuthor, string>({
      query: (authorId) => `/authors/${authorId}`,
      providesTags: ['Authors'],
    }),

    getAllAuthor: builder.query<IAuthor[], void>({
      query: () => '/authors',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ userId }) => ({
                type: 'Authors' as const,
                id: userId,
              })),
              { type: 'Authors', id: 'LIST' },
            ]
          : [{ type: 'Authors', id: 'LIST' }],
    }),
  }),
});

export const { useGetAuthorQuery, useGetAllAuthorQuery } = authorApiSlice;
