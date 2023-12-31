import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cloze: {},
};

export const clozeSlice = createSlice({
  name: "clozes",
  initialState,
  reducers: {
    addCloze: (state, action) => {
      state.cloze.question = action.payload.question;
      state.cloze.blanks = action.payload.blanks;
      state.cloze.blankQuestion = action.payload.blankQuestion;
    },
  },
});

export const { addCloze } = clozeSlice.actions;

export default clozeSlice.reducer;
