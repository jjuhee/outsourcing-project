import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: !!localStorage.getItem('uid'),
  uid: localStorage.getItem('uid'),
  nickname: localStorage.getItem('nickname'),
  avatar: localStorage.getItem('avatar')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.uid = action.payload.uid;
      state.nickname = action.payload.nickname;
      state.avatar = action.payload.avatar;
      localStorage.setItem('uid', state.uid);
      localStorage.setItem('nickname', state.nickname);
      localStorage.setItem('avatar', state.avatar);
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
