import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import FormBuilder from "./components/FormBuilder";
import TestComplete from "./components/TestComplete";
import "./App.css";
import { useSelector } from "react-redux";
function App() {
  const formId = useSelector((state) => state.SelectedFormReducer.selectedForm);
  console.log("app ", formId);
  return (
    <HashRouter>
      <Routes>
        <Route path="GetSetGo-Forms/" element={<FormBuilder />} />
        <Route path="GetSetGo-Forms/form/:id" element={<Form />} />
        <Route
          path="GetSetGo-Forms/testComplete"
          element={<TestComplete show="true" />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
