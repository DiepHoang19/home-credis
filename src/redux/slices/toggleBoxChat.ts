import { createSlice } from "@reduxjs/toolkit";

export const toggleBoxChatSlice = createSlice({
  name: "toggleBoxChat",
  initialState: {
    isShow: false,
  },
  reducers: {
    setIsShow: (state, action) => {
      state.isShow = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsShow } = toggleBoxChatSlice.actions;

export default toggleBoxChatSlice.reducer;
