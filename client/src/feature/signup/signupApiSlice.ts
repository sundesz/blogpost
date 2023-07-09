import { apiSlice } from '../../app/api/apiSlice';
import { NewUserResponse } from '../../types';

export const signupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<NewUserResponse, FormData>({
      query: (formData) => ({
        url: '/users',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useCreateUserMutation } = signupApiSlice;
