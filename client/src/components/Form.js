import FormCategory from "./FormCategory";
import axios from "axios";
import FormCloze from "./FormCloze";
import FormMCQ from "./FormMCQ";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
function Form() {
  const navigate = useNavigate();
  const formparams = useParams();
  const formId = formparams.id;
  const [formDetails, setFormDetails] = useState(null);
  // console.log("formid is ", formId);
  useEffect(() => {
    axios
      .get(`https://getsetgoforms.onrender.com/form/${formId}`)
      .then((response) => {
        console.log("response ", response.data);
        setFormDetails(response.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log("formdetails ", formDetails);
  return (
    formDetails && (
      <div className="TestForm">
        <div className="TestHeader QuestionContainer">
          <h1>{formDetails ? formDetails.name : ""} Test</h1>
        </div>
        <div className="FormSection QuestionContainer">
          <FormCategory data={formDetails.category} />
        </div>
        <div className="FormSection QuestionContainer">
          <FormCloze data={formDetails.cloze} />
        </div>
        <div className="FormSection QuestionContainer">
          <FormMCQ data={formDetails.comprehension} />
        </div>
        <button
          className="SubmitButton"
          onClick={() => {
            navigate("/testComplete");
            // axios
            //   .put("/submitTest")
            //   .then((response) => console.log(response))
            //   .catch((err) => console.log(err));
          }}
        >
          Submit Test
        </button>
      </div>
    )
  );
}

export default Form;
