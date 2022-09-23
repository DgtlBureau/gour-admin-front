import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authApi } from '../../api/authApi';
import { User } from '../../@types/entities/User';

export interface AuthState {
  currentUser: User | null;
  isAuth: boolean;
  isFetching: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  isAuth: false,
  isFetching: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(authApi.endpoints.signin.matchFulfilled, state => {
        state.isAuth = true;
      })
      .addMatcher(authApi.endpoints.getCurrentUser.matchFulfilled, state => {
        state.isAuth = true;
      })
      .addMatcher(authApi.endpoints.getCurrentUser.matchRejected, (state, action) => {
        if (action.error.name === 'ConditionError') return;
        state.isAuth = false;
      })
      .addMatcher(authApi.endpoints.signout.matchFulfilled, state => {
        state.isAuth = false;
      });
  },
});

export const { setCurrentUser, setIsAuth, setIsFetching } = authSlice.actions;

export default authSlice.reducer;
