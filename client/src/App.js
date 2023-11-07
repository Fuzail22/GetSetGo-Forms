import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import FormBuilder from "./components/FormBuilder";
import TestComplete from "./components/TestComplete";
import "./App.css";
import { useSelector } from "react-redux";
function App() {
  const formId = useSelector((state) => state.SelectedFormReducer.selectedForm);
  console.log("app ", formId);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="GetSetGo-Forms/" element={<FormBuilder />} />
        <Route path="GetSetGo-Forms/form/:id" element={<Form />} />
        <Route
          path="GetSetGo-Forms/TestComplete"
          element={<TestComplete show="true" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
