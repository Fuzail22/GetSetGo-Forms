import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMCQ, addPara } from "../features/MCQ/mcqSlice";
const MCQQuestionBuilder = () => {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState(["", ""]);
  // console.log(question);
  // console.log(choices);
  const para = useSelector((state) => state.MCQReducer.mcq.para);
  const questions = useSelector((state) => state.MCQReducer.mcq.questions);
  // const [para, setPara] = useState(
  //   useSelector((state) => state.MCQReducer.mcq.para)
  // );
  // console.log("para ", para);
  // const [questions, setQuestions] = useState(
  //   useSelector((state) => state.MCQReducer.mcq.questions)
  // );

  const dispatch = useDispatch();
  // const output = useSelector((state) => state.MCQReducer.mcq);
  // console.log("output is ", output);
  const inputPara = useRef(null);
  const [selectedChoices, setSelectedChoices] = useState([]);
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

  const handleChoiceSelect = (questionIndex, choiceIndex) => {
    const updatedChoices = [...selectedChoices];
    updatedChoices[questionIndex] = choiceIndex;
    setSelectedChoices(updatedChoices);
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
      {para && (
        <div className="FormMCQ">
          <h1>Comprehension Question</h1>
          <h2> Passage:</h2>
          <p>{para}</p>
          <h2>Multiple Choice Questions:</h2>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <p>{question.question}</p>

              {question.choices.map((choice, choiceIndex) => (
                <div key={choiceIndex}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={choice}
                      checked={selectedChoices[questionIndex] === choiceIndex}
                      onChange={() =>
                        handleChoiceSelect(questionIndex, choiceIndex)
                      }
                    />
                    {choice}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MCQQuestionBuilder;
