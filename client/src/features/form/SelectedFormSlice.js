import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedForm: {},
};

export const selectedFormSlice = createSlice({
  name: "selectedForms",
  initialState,
  reducers: {
    addSelectedForm: (state, action) => {
      state.selectedForm.name = action.payload;
    },
  },
});

export const { addSelectedForm } = selectedFormSlice.actions;

export default selectedFormSlice.reducer;
