import {
  Api,
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from '../../feature/auth/authSlice';
import { RootState } from '../store';
export const BASE_URL = '/api/v1';
// const BASE_URL = 'http://localhost:8080/api/v1';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  // `api` has the type `BaseQueryApi` (not configurable)

  // logout if session is expired
  const sessionResult = await baseQuery('/session', api, extraOptions);

  const result = sessionResult.data as { status: boolean };
  if (!result.status) {
    api.dispatch(logOut());
  }

  return await baseQuery(args, api, extraOptions);
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Blogs', 'Blog', 'Users', 'Comments', 'Authors', 'Author'],
  endpoints: (builder) => ({}),
});
