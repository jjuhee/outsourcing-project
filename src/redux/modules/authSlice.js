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
    },
    setUserAvatar: (state, action) => {
      state.avatar = action.payload;
      localStorage.setItem('avatar', state.avatar);
    },

    setUserNickname: (state, action) => {
      state.nickname = action.payload;
      localStorage.setItem('nickname', state.nickname);
    }
  }
});

export const { logIn, logOut, setUserAvatar, setUserNickname } =
  authSlice.actions;
export default authSlice.reducer;
