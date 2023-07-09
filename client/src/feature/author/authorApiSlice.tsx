import { apiSlice } from '../../app/api/apiSlice';
import { PROFILE_IMAGE } from '../../config';
import {
  Author,
  AuthorNames,
  GetAllRequestQuery,
  PaginationResponse,
} from '../../types';

export const authorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get author
     */
    getAuthor: builder.query<Author, string>({
      query: (authorId) => `/authors/${authorId}`,
      transformResponse: (responseData: Author) => {
        const profilePic = responseData.imageId
          ? `${PROFILE_IMAGE}/${responseData.userId}.png`
          : null;

        return { ...responseData, profilePic };
      },
      providesTags: ['Author'],
    }),

    /**
     * Get all author names
     */
    getAuthorNames: builder.query<AuthorNames[], void>({
      query: () => `/authors/names`,
      providesTags: ['Author'],
    }),

    /**
     * Get all author
     */
    getAllAuthor: builder.query<PaginationResponse<Author>, GetAllRequestQuery>(
      {
        query: ({ page, orderBy, orderDir, filterName, filterValue }) => ({
          url: `authors?page=${page}&orderBy=${orderBy}&orderDir=${orderDir}&columnName=${filterName}&columnValue=${filterValue}`,
        }),
        transformResponse: (responseData: PaginationResponse<Author>) => {
          const { data, ...rest } = responseData;
          const dataWithProfilePic: Author[] = data.map((author) => {
            const profilePic = author.imageId
              ? `${PROFILE_IMAGE}/${author.userId}.png`
              : null;

            return {
              ...author,
              profilePic,
            };
          });

          return { ...rest, data: dataWithProfilePic };
        },
        providesTags: ['Authors'],
      }
    ),
  }),
});

export const {
  useGetAuthorQuery,
  useGetAllAuthorQuery,
  useGetAuthorNamesQuery,
} = authorApiSlice;
