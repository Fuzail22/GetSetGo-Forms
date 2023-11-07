import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import FormBuilder from "./components/FormBuilder";
import TestComplete from "./components/TestComplete";
import "./App.css";
import { useSelector } from "react-redux";
import axios from "axios";
import LoadingOverlay from "./components/LoadingOverlay";
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://getsetgoforms.onrender.com/")
      .then((response) => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(
          "The following error occured while fetching dockets:Please Referesh ",
          err
        );
      });
  }, []);
  const formId = useSelector((state) => state.SelectedFormReducer.selectedForm);
  // console.log("app ", formId);
  return (
    <>
      {loading && <LoadingOverlay />}
      <HashRouter>
        <Routes>
          <Route path="/" element={<FormBuilder />} />
          <Route path="/form/:id" element={<Form />} />
          <Route path="/testComplete" element={<TestComplete show="true" />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
