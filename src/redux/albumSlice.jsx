import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deletedAlbums: -1
};

export const albumSlice = createSlice({
    name: "albums",
    initialState,
    reducers: {
        delAlbum: (state, action) => {
            state.deletedAlbums = action.payload;
        }
    }
})

export const {delAlbum} = albumSlice.actions;
export default albumSlice.reducer;