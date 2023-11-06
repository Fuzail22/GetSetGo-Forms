import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const FormCategory = ({ data }) => {
  console.log("data.items is ", data.items);
  const [items, setItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ]);
  const [categories, setCategories] = useState({
    c1: [],
    c2: [],
  });
  console.log(categories);
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const draggedItem = items[source.index];

    const newItems = [...items];
    newItems.splice(source.index, 1);

    const newCategories = { ...categories };
    newCategories[destination.droppableId] = [
      ...newCategories[destination.droppableId],
      draggedItem,
    ];

    setItems(newItems);
    setCategories(newCategories);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h1>Category Question</h1>
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
      <div className="vertical-categories">
        {Object.keys(categories).map((category) => (
          <div key={category} className="category">
            <h3>{category}</h3>
            <Droppable droppableId={category}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="item-list"
                >
                  {categories[category].map((item, index) => (
                    <div key={item} className="item">
                      {item}
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default FormCategory;
