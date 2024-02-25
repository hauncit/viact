import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {};

export const auth = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
