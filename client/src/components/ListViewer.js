import { useMemo, useState } from "react";
import { addAnswer } from "../features/category/categorySlice";
import { useDispatch } from "react-redux";
let answer = {};
function ListViewer(props) {
  const dispatch = useDispatch();
  let items = props.items;
  let categories = props.categories;
  const [showConfirm, setShowConfirm] = useState(false);
  useMemo(() => setShowConfirm(false), [items]);
  useMemo(() => {
    answer = {};
  }, []);
  function selectHandler(e) {
    const [i, c] = e.target.value.split(",");
    answer[i] = c;
    if (Object.keys(answer).length === items.length) setShowConfirm(true);
    // console.log(answer);
    // console.log("answer length ", Object.keys(answer).length);
  }
  //   const output = useSelector((state) => state.CategoryReducer.answer);
  //   console.log("output is ", output);
  return (
    <div className="ListViewer">
      {items.map((item) => (
        <div key={item.id} className="ListViewerItem">
          <span>{item.name}</span>
          <select onChange={selectHandler}>
            <option value="" hidden>
              select the correct category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={[item.name, cat.name]}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      ))}
      {showConfirm && (
        <button
          className="ConfirmButton"
          onClick={() => {
            let temp = { ...answer }; //to avoid object is not extensible
            dispatch(addAnswer(temp));
            setShowConfirm(false);
            items = [];
            categories = [];
          }}
        >
          Confirm Category Question
        </button>
      )}
    </div>
  );
}

export default ListViewer;
