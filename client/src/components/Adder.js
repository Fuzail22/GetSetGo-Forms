import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../features/category/categorySlice";
import { addItem } from "../features/item/itemSlice";
function Adder(props) {
  const dispatch = useDispatch();
  const inputValue = useRef(null);
  const handleAddField = () => {
    if (props.name === "Category")
      dispatch(addCategory(inputValue.current.value));
    else dispatch(addItem(inputValue.current.value));
    inputValue.current.value = "";
  };
  return (
    <div className="Adder">
      <input type="text" placeholder={`Enter ${props.name}`} ref={inputValue} />
      <button onClick={handleAddField}>Add {props.name}</button>
    </div>
  );
}

export default Adder;
