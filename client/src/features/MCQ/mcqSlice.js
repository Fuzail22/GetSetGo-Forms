import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mcq: { para: "", questions: [] },
};

export const mcqSlice = createSlice({
  name: "mcqs",
  initialState,
  reducers: {
    addMCQ: (state, action) => {
      const temp = { question: "", choices: [] };
      temp.question = action.payload.question;
      temp.choices = action.payload.choices;
      state.mcq.questions.push(temp);
    },
    addPara: (state, action) => {
      state.mcq.para = action.payload;
    },
  },
});

export const { addMCQ, addPara } = mcqSlice.actions;

export default mcqSlice.reducer;
