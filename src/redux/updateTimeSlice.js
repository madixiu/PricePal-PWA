import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updateTime: ""
};

const updateTimeSlice = createSlice({
  name: 'updateTime',
  initialState,
  reducers: {
    setUpdateTime: (state, action) => {
      state.updateTime = action.payload;
    }
  }
});

export const { setUpdateTime } = updateTimeSlice.actions;
export const selectUpdateTime = (state) => state.updateTime;
export default updateTimeSlice.reducer;