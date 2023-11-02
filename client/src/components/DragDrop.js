import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { reorderItem } from "../features/item/itemSlice";
import { reorderCategory } from "../features/category/categorySlice";
function DragDrop(props) {
  const dispatch = useDispatch();
  const feature = props.feature;
  const onDragEnd = (result) => {
    if (!result.destination) {
      return; // Dropped outside the list
    }

    const reorderedItems = [...feature];
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);
    if (props.name === "Category") dispatch(reorderCategory(reorderedItems));
    else dispatch(reorderItem(reorderedItems));
  };
  return (
    <div className="DragDrop">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={props.name}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {feature.map((feat, index) => (
                <Draggable key={feat.id} draggableId={feat.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className="DragDropItem"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {feat.name}
                      <span className="DragHandle">☰</span>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default DragDrop;
