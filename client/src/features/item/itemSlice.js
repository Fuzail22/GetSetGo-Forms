import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = {
        id: nanoid(),
        name: action.payload,
      };
      state.items.push(item);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    reorderItem: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addItem, removeItem, reorderItem } = itemSlice.actions;

export default itemSlice.reducer;
