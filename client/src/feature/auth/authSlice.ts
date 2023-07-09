import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { LoginResponse, UserRoleType } from '../../types';
import { BACKEND_BASE_URL, PROFILE_IMAGE } from '../../config';

export interface AuthState {
  isAuthenticated: boolean;
  userId: string;
  email: string;
  name: string;
  role: UserRoleType | null;
  profilePic: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: '',
  email: '',
  name: '',
  role: null,
  profilePic: '',
};

export interface UnknownError {
  message: string;
}

export const refetchSession = createAsyncThunk<
  LoginResponse,
  undefined,
  { rejectValue: UnknownError }
>('auth/session', async (_, thunkApi) => {
  const response = await fetch(`${BACKEND_BASE_URL}/session`);

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch',
    } as UnknownError);
  }

  const sessionData: {
    status: boolean;
    data: LoginResponse;
  } = await response.json();

  if (sessionData.status) {
    const profilePic = sessionData.data.profilePic
      ? `${PROFILE_IMAGE}/${sessionData.data.profilePic}.png`
      : null;

    return {
      ...sessionData.data,
      isAuthenticated: true,
      profilePic,
    };
  } else {
    return {
      userId: '',
      email: '',
      name: '',
      role: 'user',
      isAuthenticated: false,
      profilePic: '',
    };
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      const { userId, email, name, role, profilePic } = action.payload;

      state.isAuthenticated = true;
      state.userId = userId;
      state.email = email;
      state.name = name;
      state.role = role;
      state.profilePic = profilePic;
    },

    logOut: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      refetchSession.fulfilled,
      (state: AuthState, action: PayloadAction<LoginResponse>) => {
        const { isAuthenticated, userId, name, email, role, profilePic } =
          action.payload;
        state.isAuthenticated = isAuthenticated!;
        state.userId = userId;
        state.email = email;
        state.name = name;
        state.role = role;
        state.profilePic = profilePic;
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
  profilePic: state.auth.profilePic,
});
