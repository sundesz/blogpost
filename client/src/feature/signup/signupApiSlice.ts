import { apiSlice } from '../../app/api/apiSlice';
import { INewUser, INewUserResponse } from '../../types';

export const signupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<INewUserResponse, INewUser>({
      query: (newUserData) => ({
        url: '/users',
        method: 'POST',
        body: { ...newUserData },
      }),
    }),
  }),
});

export const { useCreateUserMutation } = signupApiSlice;
