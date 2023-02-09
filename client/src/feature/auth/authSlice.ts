import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ILoginResponse, UserRoleType } from '../../types';
import { BASE_URL } from '../../app/api/apiSlice';

export interface IAuthState {
  isAuthenticated: boolean;
  userId: string;
  email: string;
  name: string;
  role: UserRoleType | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  userId: '',
  email: '',
  name: '',
  role: null,
};

export interface IUnknownError {
  message: string;
}

export const refetchSession = createAsyncThunk<
  ILoginResponse,
  undefined,
  { rejectValue: IUnknownError }
>('auth/session', async (_, thunkApi) => {
  const response = await fetch(`${BASE_URL}/session`);

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch',
    } as IUnknownError);
  }

  const sessionData = (await response.json()) as {
    status: boolean;
    data: ILoginResponse;
  };

  if (sessionData.status) {
    return { ...sessionData.data, isAuthenticated: true };
  } else {
    return {
      userId: '',
      email: '',
      name: '',
      role: 'user' as UserRoleType,
      isAuthenticated: false,
    };
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<ILoginResponse>) => {
      const { userId, email, name, role } = action.payload;

      state.isAuthenticated = true;
      state.userId = userId;
      state.email = email;
      state.name = name;
      state.role = role as UserRoleType;
    },

    logOut: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      refetchSession.fulfilled,
      (state: IAuthState, action: PayloadAction<ILoginResponse>) => {
        const { isAuthenticated, userId, name, email, role } = action.payload;
        state.isAuthenticated = isAuthenticated!;
        state.userId = userId;
        state.email = email;
        state.name = name;
        state.role = role as UserRoleType;
      }
    );
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => ({
  isAuthenticate: state.auth.isAuthenticated,
  email: state.auth.email,
  name: state.auth.name,
  userId: state.auth.userId,
  role: state.auth.role,
});
