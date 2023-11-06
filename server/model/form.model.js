import mongoose from "mongoose";

// const categorySchema = new mongoose.Schema({
//     categories: categories,
//     items: items,
//     answer: answer,
//   });

const formSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    completed: Boolean,
    category: {},
    cloze: {},
    comprehension: {},
  },
  { versionKey: false }
);

const Form = mongoose.model("Form", formSchema);

export { Form };
