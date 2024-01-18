import { createSlice } from '@reduxjs/toolkit';

export const entrySlice = createSlice({
  name: 'entry',
  initialState: {
    valuesArray: [],
    userToken: null,
  },
  reducers: {
    setValues: (state, action) => {
      console.log("IN ENTRYSLICE");
      console.log(action.payload);
      return {
        ...state, 
        valuesArray: action.payload,
      }
    },
    clearValues: (state, action) => {
      console.log("in clear valuesarray");
      return {
        ...state,
        valuesArray: [],
      };
    },
    addValue: (state, action) => {
      console.log("in dispatch");
      return {
        ...state,
        valuesArray: [...state.valuesArray, action.payload],
      };
    },
  },
});

export const { addValue, clearValues, setValues} = entrySlice.actions;

export const selectValuesArray = (state) => state.entry.valuesArray;

export const entrySelector = (state) => state.entry;

export default entrySlice.reducer;
