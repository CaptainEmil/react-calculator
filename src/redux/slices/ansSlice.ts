import { Reducer, UnknownAction, createSlice } from "@reduxjs/toolkit";

export const ansSlice= createSlice({
    name: 'ans',
    initialState: "",
    reducers: {
        setAns: (state, action) => {
            return action.payload.payload;
        }
    }
});

export const { setAns } = ansSlice.actions;

export default ansSlice.reducer;