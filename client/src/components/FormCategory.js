import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const FormCategory = ({ data }) => {
  console.log("data.items is ", data.categories);
  const newCategories = {};
  const newItems = [];
  const categoriesArray = data.categories;
  categoriesArray.forEach((category) => {
    newCategories[category.name] = [];
  });
  // console.log("new cat is ", newCategories);
  const itemsArray = data.items;
  itemsArray.forEach((item) => newItems.push(item.name));

  const [items, setItems] = useState(newItems);
  const [categories, setCategories] = useState(newCategories);
  // console.log(categories);
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
