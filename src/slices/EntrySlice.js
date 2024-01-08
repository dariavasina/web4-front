import { createSlice } from '@reduxjs/toolkit';

export const entrySlice = createSlice({
  name: 'entry',
  initialState: {
    valuesArray: [],
    userToken: null,
  },
  reducers: {
    setValues: (state, action) => {
      return {
        ...state, 
        valuesArray: action.payload,
      }
    },
    addValue: (state, action) => {
      console.log("in dispatch");
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

export const entrySelector = (state) => state.entry;

export default entrySlice.reducer;
