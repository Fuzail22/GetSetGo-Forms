import { useSelector, useDispatch } from "react-redux";
import Adder from "./Adder";
import DragDrop from "./DragDrop";
import ListViewer from "./ListViewer";
import ClozeQuestion from "./ClozeQuestion";
import MCQQuestionBuilder from "./MCQQuestionBuilder";
import { addForm } from "../features/form/formSlice";
import { addSelectedForm } from "../features/form/SelectedFormSlice";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
function FormBuilder() {
  const [forms, setForms] = useState([]);
  const testName = useRef(null);
  const categories = useSelector((state) => state.CategoryReducer.categories);
  const items = useSelector((state) => state.ItemReducer.items);
  const answer = useSelector((state) => state.CategoryReducer.answer);
  const question = useSelector((state) => state.ClozeReducer.cloze.question);
  const blanks = useSelector((state) => state.ClozeReducer.cloze.blanks);
  const para = useSelector((state) => state.MCQReducer.mcq.para);
  const questions = useSelector((state) => state.MCQReducer.mcq.questions);
  const formName = useSelector((state) => state.FormReducer.form.name);
  const formId = useSelector((state) => state.FormReducer.form.id);
  const dispatch = useDispatch();
  console.log("forms is ", forms);
  useEffect(() => {
    axios
      .get("http://localhost:5000/forms")
      .then((response) => setForms(response.data));
  }, []);
  const handleChange = (event) => {
    dispatch(addSelectedForm(event.target.value));
  };
  return (
    <div className="FormBuilderContainer">
      <a href="/form">Go to Form</a>
      <select onChange={handleChange}>
        {forms.map((log, index) => (
          <option key={log._id} value={log._id}>
            {log.name}
          </option>
        ))}
      </select>
      <h2>
        Welcome to <span>GetSetGo</span> Forms
      </h2>
      <div className="FormQuestion QuestionContainer">
        <input type="text" placeholder="Enter Test Name" ref={testName} />
        <button
          onClick={() => {
            dispatch(addForm(testName.current.value));
            testName.current.value = "";
          }}
        >
          Confirm Test Name
        </button>
      </div>
      <div className="CategoriesQuestion QuestionContainer">
        <Adder name="Category" />
        <DragDrop name="Category" feature={categories} />
        <Adder name="Item" />
        <DragDrop name="Item" feature={items} />
        <ListViewer categories={categories} items={items} />
      </div>
      <div className="ClozeQuestion QuestionContainer">
        <ClozeQuestion />
      </div>
      <div className="CompreQuestion QuestionContainer">
        <MCQQuestionBuilder />
      </div>
      <button
        onClick={() => {
          const formData = {
            _id: formId,
            name: formName,
            completed: false,
            category: {
              categories: categories,
              items: items,
              answer: answer,
            },
            cloze: {
              question: question,
              blanks: blanks,
            },
            comprehension: {
              para: para,
              questions: questions,
            },
          };
          console.log(formData);
          axios
            .post("http://localhost:5000/", formData)
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
        }}
      >
        Create Form
      </button>
    </div>
  );
}

export default FormBuilder;
