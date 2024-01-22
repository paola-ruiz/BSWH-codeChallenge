import { configureStore } from "@reduxjs/toolkit";
import albumSlice from "./albumSlice";

export const store = configureStore({
    reducer: {
        album: albumSlice,
    }
})