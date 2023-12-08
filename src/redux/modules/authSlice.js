import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  profile: {
    email: undefined,
    nickname: undefined,
    avatar: undefined
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    }
  }
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
