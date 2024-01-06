// import { createSlice } from '@reduxjs/toolkit';

// export const entrySlice = createSlice({
//   name: 'entry',
//   initialState: {
//     valuesArray: [],
//   },
//   reducers: {
//     addValue: (state, action) => {
//         console.log("pushing...")
//         state.valuesArray.push(action.payload);
//         return state;
//     },
//     clearValues: (state) => {
//       state.valuesArray = [];
//     },
//   },
// });

// export const { addValue, clearValues } = entrySlice.actions;

// export const selectValuesArray = (state) => state.entry.valuesArray;

// export const selectMainState = (state) => state.main;

// // Selector for entryReducer's state
// export const selectEntryState = (state) => state.entry;

// export default entrySlice.reducer;
