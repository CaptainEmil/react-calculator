import { createSlice } from "@reduxjs/toolkit";

export const zerosCntSlice = createSlice({
    name: 'zerosCnt',
    initialState: [0, 0],
    reducers: {
        increment1: (state) => {
            const arr = { ...state };
            arr[0]++;
            return arr;
        },

        increment2: (state) => {
            const arr = { ...state };
            arr[1]++;
            return arr;
        },
        reset: () => [0, 0]
    }
});

export const { increment1, increment2, reset } = zerosCntSlice.actions;

export default zerosCntSlice.reducer;