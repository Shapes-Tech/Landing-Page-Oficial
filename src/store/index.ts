import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./languageSlice";
import  colorReducer from "./colorSlice";

export const store = configureStore({
    reducer:{
        language: languageReducer,
        color: colorReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch