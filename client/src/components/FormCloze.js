import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
function FormCloze({ data }) {
  // console.log("cloze data ", data);
  let question = data.question;
  let blanks = data.blanks;
  let itm = data.question.filter((it, index) => blanks.includes(index));
  // console.log("itm are ", itm);
  // console.log("intial question is ", question);
  const [sblanks, SetSblanks] = useState(blanks);
  const [questions, setQuestions] = useState(question);
  const [items, setItems] = useState(itm);
  const [submit, setSubmit] = useState(false);
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    // console.log("source ", source.index);

    const destindex = Number(destination.droppableId);
    const item = items[source.index];
    const blankIndex = sblanks.indexOf(destindex);
    // console.log("dest ", destindex);
    // console.log("blankIndex is ", blankIndex);
    // console.log("blanks before update ", sblanks);
    let tmp = [...sblanks];
    tmp.splice(blankIndex, 1);
    // sblanks.splice(blankIndex, 1);
    SetSblanks(tmp);

    let newquestions = [...questions];
    newquestions[destindex] = item;
    // console.log(newquestions);
    // console.log("updated blanks ", sblanks);
    let tmp2 = [...items];
    tmp2.splice(source.index, 1);
    setItems(tmp2);
    // items.splice(source.index, 1);
    setQuestions(newquestions);
  };
  // console.log("qstate ", questions);
  // console.log("items ", items);
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

      {!submit && (
        <>
          <button
            onClick={() => {
              // console.log("reset start");
              // console.log("blanks",blank)
              SetSblanks(blanks);
              setQuestions(question);
              setItems(itm);
            }}
          >
            Reset
          </button>
          <button
            onClick={() => {
              // console.log("submit start");
              SetSblanks([]);
              setQuestions([]);
              setItems([]);
              setSubmit(true);
            }}
          >
            Submit
          </button>
        </>
      )}
    </DragDropContext>
  );
}

export default FormCloze;
