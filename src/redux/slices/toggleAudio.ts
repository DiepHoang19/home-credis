import { createSlice } from "@reduxjs/toolkit";

export const toggleAudioSlice = createSlice({
  name: "toggleAudio",
  initialState: {
    isShowAudio: false,
  },
  reducers: {
    setIsShowAudio: (state, action) => {
      state.isShowAudio = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsShowAudio } = toggleAudioSlice.actions;

export default toggleAudioSlice.reducer;
