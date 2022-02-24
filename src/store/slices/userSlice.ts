import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../@types/entities/User';

export interface UserState {
  user: User | void;
}

const initialState: UserState = {
  user: void 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
