import { createSlice } from "@reduxjs/toolkit";
import BigDecimal from "src/BigDecimal";

export const ansSlice = createSlice({
    name: 'tasks',
    initialState: new BigDecimal("0"),
    reducers: {
        setAns: (state, action) => {
            return action.payload;
        }
    }
});

export const { setAns } = ansSlice.actions;

export default ansSlice.reducer;