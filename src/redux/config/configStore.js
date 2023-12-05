import course from 'redux/modules/courseSlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  course
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
