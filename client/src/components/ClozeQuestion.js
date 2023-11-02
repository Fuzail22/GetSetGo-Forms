import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCloze } from "../features/cloze/clozeSlice";
function ClozeQuestion() {
  const [question, setQuestion] = useState("");
  const inputQues = useRef(null);
  const [blank, setBlank] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  let sel = "";
  const [quesArr, setQuesArr] = useState([]);
  let blankPositions = useMemo(() => [], [quesArr]);
  const dispatch = useDispatch();
  // const output = useSelector((state) => state.ClozeReducer.cloze);
  // console.log(output);
  function addQuestionHandler() {
    const ques = inputQues.current.value;
    console.log(ques);
    inputQues.current.value = "";
    setQuesArr(ques.split(" "));
    setQuestion(ques);
  }

  return (
    <div className="ClozeQuestion">
      <input
        type="text"
        ref={inputQues}
        className="ClozeInput"
        placeholder="Enter the cloze question"
        required
      />
      <button className="AddQuestionButton" onClick={addQuestionHandler}>
        Add Question
      </button>
      <div
        className="ClozeContent"
        onMouseUp={() => {
          sel = window.getSelection().toString();
          if (sel !== "") {
            console.log("Selected Text:", sel);
            setSelectedText(sel);
            setBlank(true);
          }
        }}
        id="closze"
      >
        {question}
      </div>
      {blank && (
        <div className="BlankConfirmation">
          Do you want to add "{selectedText}"as an blank?
          <button
            className="ConfirmBlankButton"
            onClick={() => {
              const index = quesArr.indexOf(selectedText);
              console.log("index is", index);
              if (index !== -1) blankPositions.push(index);
              else
                alert(
                  "selected text not found make sure to not select empty spaces are two words together ",
                  selectedText
                );
              console.log("blanks are ", blankPositions);
              setSelectedText("");
              setBlank(false);
            }}
          >
            yes
          </button>
          <button
            className="RejectBlankButton"
            onClick={() => {
              setSelectedText("");
              setBlank(false);
            }}
          >
            no
          </button>
        </div>
      )}
      {blankPositions.length > 0 && (
        <button
          className="ConfirmClozeButton"
          onClick={() => {
            let cloze = {};
            cloze.question = quesArr;
            cloze.blanks = blankPositions;
            dispatch(addCloze(cloze));
            setQuesArr([]);
            setQuestion("");
          }}
        >
          Confirm Cloze Question
        </button>
      )}
    </div>
  );
}

export default ClozeQuestion;
