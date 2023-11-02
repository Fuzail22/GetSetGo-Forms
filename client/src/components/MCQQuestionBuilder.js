import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addMCQ, addPara } from "../features/MCQ/mcqSlice";
const MCQQuestionBuilder = () => {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState(["", ""]);
  // console.log(question);
  // console.log(choices);
  const dispatch = useDispatch();
  // const output = useSelector((state) => state.MCQReducer.mcq);
  // console.log("output is ", output);
  const inputPara = useRef(null);
  function addParaHandler() {
    dispatch(addPara(inputPara.current.value));
    inputPara.current.value = "";
  }
  const handleChoiceChange = (e, index) => {
    const newChoices = [...choices];
    newChoices[index] = e.target.value;
    setChoices(newChoices);
  };

  const addChoice = () => {
    if (choices.length < 6) {
      setChoices([...choices, ""]);
    }
  };

  const removeChoice = (index) => {
    if (choices.length > 2) {
      const newChoices = [...choices];
      newChoices.splice(index, 1);
      setChoices(newChoices);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const renderChoices = choices.map((choice, index) => (
    <div key={index}>
      <input
        type="text"
        placeholder={`Choice ${index + 1}`}
        value={choice}
        onChange={(e) => handleChoiceChange(e, index)}
      />
      <button onClick={() => removeChoice(index)}>Remove</button>
    </div>
  ));

  return (
    <div className="CompreQuestion">
      <textarea
        cols="50"
        rows="10"
        ref={inputPara}
        className="PassageTextarea"
        placeholder="Enter the passage"
      ></textarea>
      <button className="AddParaButton" onClick={addParaHandler}>
        Add Para
      </button>
      <br />
      <textarea
        placeholder="Enter the Question"
        value={question}
        onChange={handleQuestionChange}
        className="QuestionTextarea"
        cols="50"
      ></textarea>
      {renderChoices}
      <button className="AddChoiceButton" onClick={addChoice}>
        Add Choice
      </button>
      <button
        className="SaveQuestionButton"
        onClick={() => {
          const temp = { question: question, choices: choices };
          dispatch(addMCQ(temp));
          setChoices(["", ""]);
          setQuestion("");
        }}
      >
        Save Question
      </button>
    </div>
  );
};

export default MCQQuestionBuilder;
