import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedForm: {},
};

export const selectedFormSlice = createSlice({
  name: "selectedForms",
  initialState,
  reducers: {
    addSelectedForm: (state, action) => {
      state.selectedForm.id = action.payload;
    },
  },
});

export const { addSelectedForm } = selectedFormSlice.actions;

export default selectedFormSlice.reducer;
