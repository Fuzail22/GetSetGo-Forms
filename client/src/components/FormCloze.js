import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
function ClozeQuestion() {
  let question = ["The", "quick", "brown", "fox", "", "over", "the", "", "dog"];
  let blanks = [4, 8];
  const [sblanks, SetSblanks] = useState(blanks);
  const [questions, setQuestions] = useState(question);
  const [items, setItems] = useState(["jumps", "dog"]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log("source ", source.index);

    const destindex = Number(destination.droppableId);
    const item = items[source.index];
    const blankIndex = sblanks.indexOf(destindex);
    // console.log("dest ", destindex);
    // console.log("blankIndex is ", blankIndex);
    // console.log("blanks before update ", sblanks);
    sblanks.splice(blankIndex, 1);
    let newquestions = [...questions];
    newquestions[destindex] = item;
    console.log(newquestions);
    // console.log("updated blanks ", sblanks);
    setQuestions(newquestions);
  };
  console.log("qstate ", questions);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h1>Cloze Question</h1>
      <div className="horizontal-list">
        <Droppable droppableId="horizontal-list" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="horizontal-list"
            >
              {items.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="item"
                    >
                      {item}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      {questions.map((q, index) => (
        <span key={index}>
          {sblanks.includes(index) ? (
            <Droppable index={index} key={index} droppableId={`${index}`}>
              {(provided, snapshot) => (
                <span
                  key={index}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={
                    snapshot.isDraggingOver
                      ? "item-listcloze item-list-dragging"
                      : "item-listcloze"
                  }
                >
                  <span key={index}>{"Drop Here"}</span>
                </span>
              )}
            </Droppable>
          ) : (
            <span> {q} </span>
          )}
        </span>
      ))}

      <button
        onClick={() => {
          SetSblanks(blanks);
          setQuestions(question);
        }}
      >
        Reset
      </button>
      <button>Submit</button>
    </DragDropContext>
  );
}

export default ClozeQuestion;
