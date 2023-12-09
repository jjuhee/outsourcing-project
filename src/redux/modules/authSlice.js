import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  uid: null,
  nickname: undefined
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.uid = action.payload.uid;
      state.nickname = action.payload.nickname;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.uid = null;
      state.nickname = undefined;
    }
  }
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
