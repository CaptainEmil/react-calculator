import { createSlice } from "@reduxjs/toolkit";

export const dotFlagsSlice = createSlice({
    name: 'dotFlags',
    initialState: [false, false],
    reducers: {
        setFlags: (state, action) => {
            return action.payload;
        }
    }
});

export const { setFlags } = dotFlagsSlice.actions;

export default dotFlagsSlice.reducer;