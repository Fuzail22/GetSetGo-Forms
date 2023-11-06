import { useState } from "react";

const FormMCQ = () => {
  const data = {
    comprehension: {
      para: "There lived a lion and peacock",
      questions: [
        {
          question: "animals in the passage?",
          choices: ["lion", "zebra"],
        },
        {
          question: "what lived with lion",
          choices: ["tiger", "peacock"],
        },
      ],
    },
  };
  const { para, questions } = data.comprehension;

  const [selectedChoices, setSelectedChoices] = useState([]);

  const handleChoiceSelect = (questionIndex, choiceIndex) => {
    const updatedChoices = [...selectedChoices];
    updatedChoices[questionIndex] = choiceIndex;
    setSelectedChoices(updatedChoices);
  };

  return (
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
  );
};

export default FormMCQ;
