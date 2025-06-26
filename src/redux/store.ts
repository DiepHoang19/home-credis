import { configureStore } from "@reduxjs/toolkit";
import toggleBoxChatSlice from "./slices/toggleBoxChat";
import toggleAudioSlice from "./slices/toggleAudio";

export default configureStore({
  reducer: {
    toggleBoxChat: toggleBoxChatSlice,
    toggleAudio: toggleAudioSlice,
  },
});
