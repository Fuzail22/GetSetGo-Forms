import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  form: {},
};

export const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addForm: (state, action) => {
      state.form.id = nanoid();
      state.form.name = action.payload;
    },
  },
});

export const { addForm } = formSlice.actions;

export default formSlice.reducer;
