import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LanguageState = {
  currentLanguage: 'es'|'en' ;
};

const initialState: LanguageState = {
  currentLanguage: "es",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'es' | 'en'>) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions
export default languageSlice.reducer