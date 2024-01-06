import { createSlice } from '@reduxjs/toolkit';

export const entrySlice = createSlice({
  name: 'entry',
  initialState: {
    valuesArray: [],
  },
  reducers: {
    setValues: (state, action) => {
      //state.valuesArray = action.payload; // Update the entire valuesArray with the payload
      return {
        ...state, 
        valuesArray: action.payload,
      }
    },
    addValue: (state, action) => {
      console.log("in entrySlice");
      console.log(action.payload);
      console.log(state.valuesArray);
      return {
        ...state,
        valuesArray: [...state.valuesArray, action.payload],
      };
    },
    clearValues: (state) => {
      state.valuesArray = [];
    },
  },
});

export const { addValue, clearValues, setValues } = entrySlice.actions;

export const selectValuesArray = (state) => state.entry.valuesArray;

// export const selectMainState = (state) => state.main;

// Selector for entryReducer's state
export const entrySelector = (state) => state.entry;

export default entrySlice.reducer;
