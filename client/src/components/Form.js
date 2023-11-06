import FormCategory from "./FormCategory";
import axios from "axios";
import FormCloze from "./FormCloze";
import FormMCQ from "./FormMCQ";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
function Form({ data }) {
  const navigate = useNavigate();
  const formId = useSelector((state) => state.SelectedFormReducer.selectedForm);
  console.log("formid is ", formId);
  console.log("Data is ", data);
  return (
    <div className="TestForm">
      <div className="TestHeader QuestionContainer">
        <h1>Test</h1>
      </div>
      <div className="FormSection QuestionContainer">
        <FormCategory />
      </div>
      <div className="FormSection QuestionContainer">
        <FormCloze />
      </div>
      <div className="FormSection QuestionContainer">
        <FormMCQ />
      </div>
      <button
        className="SubmitButton"
        onClick={() => {
          navigate("/TestComplete");
          axios
            .put("/submitTest")
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
        }}
      >
        Submit Test
      </button>
    </div>
  );
}

export default Form;
