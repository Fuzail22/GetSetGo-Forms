import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  answer: {},
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const category = {
        id: nanoid(),
        name: action.payload,
      };
      state.categories.push(category);
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    reorderCategory: (state, action) => {
      state.categories = action.payload;
    },
    addAnswer: (state, action) => {
      state.answer = action.payload;
    },
  },
});

export const { addCategory, removeCategory, reorderCategory, addAnswer } =
  categorySlice.actions;

export default categorySlice.reducer;
