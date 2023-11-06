import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "../features/category/categorySlice";
import ItemReducer from "../features/item/itemSlice";
import ClozeReducer from "../features/cloze/clozeSlice";
import MCQReducer from "../features/MCQ/mcqSlice";
import FormReducer from "../features/form/formSlice";
import SelectedFormReducer from "../features/form/SelectedFormSlice";
export const store = configureStore({
  reducer: {
    CategoryReducer,
    ItemReducer,
    ClozeReducer,
    MCQReducer,
    FormReducer,
    SelectedFormReducer,
  },
});
