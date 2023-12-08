import { configureStore, combineReducers } from '@reduxjs/toolkit';
import course from '../modules/courseSlice';
import auth from '../modules/authSlice';

const rootReducer = combineReducers({
  course,
  auth
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
