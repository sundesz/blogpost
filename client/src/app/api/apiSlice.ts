import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { logOut } from '../../feature/auth/authSlice';
import { BACKEND_BASE_URL } from '../../config';

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_BASE_URL,
  credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  // `api` has the type `BaseQueryApi` (not configurable)

  try {
    // logout if session is expired
    const sessionResult = await baseQuery('/session', api, extraOptions);

    if (sessionResult.hasOwnProperty('error')) {
      throw new Error(String(sessionResult.error?.status));
    } else {
      const result = sessionResult.data as { status: boolean };
      if (!result.status) {
        api.dispatch(logOut());
      }
    }
  } catch (error) {
    console.error(error);
  }

  return await baseQuery(args, api, extraOptions);
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Blogs', 'Blog', 'Users', 'Comments', 'Authors', 'Author'],
  endpoints: (builder) => ({}),
});
