import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  uid: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.uid = action.payload.uid;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.uid = null;
    }
  }
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
