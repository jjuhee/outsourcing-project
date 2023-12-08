import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    addCourse: (state, action) => {},
    deleteCourse: (state, action) => {},
    editCourse: (state, action) => {}
  }
});

export const { addCourse, deleteCourse, editCourse } = courseSlice.actions;
export default courseSlice.reducer;
