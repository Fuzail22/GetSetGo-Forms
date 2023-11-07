import { useSelector, useDispatch } from "react-redux";
import Adder from "./Adder";
import DragDrop from "./DragDrop";
import ListViewer from "./ListViewer";
import ClozeQuestion from "./ClozeQuestion";
import MCQQuestionBuilder from "./MCQQuestionBuilder";
import { addForm } from "../features/form/formSlice";
import { addSelectedForm } from "../features/form/SelectedFormSlice";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SuccessMessage from "./SuccessMessage";
import FailureMessage from "./FailureMessage";
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
  const navigate = useNavigate();
  const selectedFormId = useSelector(
    (state) => state.SelectedFormReducer.selectedForm.id
  );

  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  function showSuccessMessage() {
    setIsSuccessVisible(true);
    setTimeout(() => {
      setIsSuccessVisible(false);
    }, 5000);
  }
  const [isFailureVisible, setIsFailureVisible] = useState(false);
  function showFailureMessage() {
    setIsFailureVisible(true);
    setTimeout(() => {
      setIsFailureVisible(false);
    }, 5000);
  }
  useEffect(() => {
    axios
      .get("https://getsetgoforms.onrender.com/forms")
      .then((response) => setForms(response.data));
  }, []);
  const handleChange = (event) => {
    dispatch(addSelectedForm(event.target.value));
  };
  return (
    <div className="FormBuilderContainer">
      <select onChange={handleChange}>
        <option key="default" value="" hidden>
          Select a form
        </option>
        {forms.map((log, index) => (
          <option key={log._id} value={log._id}>
            {log.name}
          </option>
        ))}
      </select>
      <button
        className="openTest"
        onClick={() => {
          navigate(`form/${selectedFormId}`);
        }}
      >
        Open Test
      </button>
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
      <h2>{formName}</h2>
      <div className="CategoriesQuestion QuestionContainer">
        <h3>Category Question</h3>
        <Adder name="Category" />
        <DragDrop name="Category" feature={categories} />
        <Adder name="Item" />
        <DragDrop name="Item" feature={items} />
        <ListViewer categories={categories} items={items} />
      </div>
      <div className="ClozeQuestion QuestionContainer">
        <h3>Cloze Question</h3>
        <ClozeQuestion />
      </div>
      <div className="CompreQuestion QuestionContainer">
        <h3>Comprehension Question</h3>
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
          // console.log(formData);

          axios
            .post("https://getsetgoforms.onrender.com/", formData)
            .then((response) => {
              console.log(response);
              showSuccessMessage();
            })
            .catch((err) => {
              console.log(err);
              showFailureMessage();
            });
        }}
      >
        Create Form
      </button>
      {isSuccessVisible && (
        <SuccessMessage message="Form Submitted Successfully" />
      )}
      {isFailureVisible && (
        <FailureMessage message="Error Submitting Form, check console" />
      )}
    </div>
  );
}

export default FormBuilder;
