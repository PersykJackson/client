import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface AuthState {
  token: string | undefined;
}

const initialState: AuthState = {
  token: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export function tokenSelector(state: RootState): string | undefined {
  return state.auth.token;
}

export default authSlice.reducer;
