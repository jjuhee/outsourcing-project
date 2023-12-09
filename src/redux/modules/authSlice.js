import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: !!localStorage.getItem('uid'),
  uid: localStorage.getItem('uid'),
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
      localStorage.setItem('uid', state.uid);
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.uid = null;
      state.nickname = undefined;
      localStorage.clear();
    }
  }
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
