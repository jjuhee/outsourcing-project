import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from '../modules/authSlice';

const rootReducer = combineReducers({
  auth
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
