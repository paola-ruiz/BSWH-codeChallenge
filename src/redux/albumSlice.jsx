import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deletedAlbums: null
};

export const albumSlice = createSlice({
    name: "albums",
    initialState,
    reducers: {
        delAlbum: (state, action) => {
            state.deletedAlbums = action.payload;
            console.log(state.deletedAlbums.user);
        }
    }
})

export const {delAlbum} = albumSlice.actions;
export default albumSlice.reducer;