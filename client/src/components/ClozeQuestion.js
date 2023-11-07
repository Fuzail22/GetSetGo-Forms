import { useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addCloze } from "../features/cloze/clozeSlice";
function ClozeQuestion() {
  const [question, setQuestion] = useState("");
  const inputQues = useRef(null);
  const [blank, setBlank] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("");
  let sel = "";
  const [quesArr, setQuesArr] = useState([]);
  let blankPositions = useMemo(() => [], [quesArr]);
  const dispatch = useDispatch();
  const [blankQuestion, setBlankQuestion] = useState([]);
  // const output = useSelector((state) => state.ClozeReducer.cloze);
  // console.log(output);
  function addQuestionHandler() {
    const ques = inputQues.current.value;
    console.log(ques);
    inputQues.current.value = "";
    setQuesArr(ques.split(" "));
    setQuestion(ques);
    setBlankQuestion(ques.split(" "));
  }
  console.log("blankq ", blankQuestion);
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
      {question && (
        <div>
          {/* <div
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
            <h5>Select the blanks</h5>
            {question}
          </div> */}
          <div className="ClozeContent" id="closze">
            <h5>Select the blanks by click</h5>
            {quesArr.map((qu, index) => (
              <span
                onClick={() => {
                  console.log("Selected index:", index);
                  setSelectedText(quesArr[index]);
                  setBlank(true);
                  setSelectedIndex(index);
                }}
                key={index}
              >
                {qu}{" "}
              </span>
            ))}
          </div>
          <div>
            <h5>Preview</h5>
            {blankQuestion.map((qu, index) => (
              <span key={index}>{qu} </span>
            ))}
          </div>
        </div>
      )}

      {blank && (
        <div className="BlankConfirmation">
          Do you want to add "{selectedText}"as an blank?
          <button
            className="ConfirmBlankButton"
            onClick={() => {
              const index = selectedIndex;
              console.log("index is", index);
              if (index !== -1) {
                blankPositions.push(index);
                console.log(typeof blankQuestion);
                const temp = [...blankQuestion];
                temp.splice(index, 1, "____");
                setBlankQuestion(temp);
                // blankQuestion.splice(index, 1, "----");
                // setBlankQuestion(blankQuestion);
                // blankQuestion[index] = "----";
              } else
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
      <br />
      {blankPositions.length > 0 && (
        <button
          className="ConfirmClozeButton"
          onClick={() => {
            let cloze = {};
            cloze.question = quesArr;
            cloze.blanks = blankPositions;
            cloze.blankQuestion = blankQuestion;
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
