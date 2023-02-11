import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en",
  changeLang: false,
};

const languageSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      state.changeLang = true;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
