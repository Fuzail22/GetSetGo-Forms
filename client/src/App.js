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
  const data = formId.name;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormBuilder />} />
        <Route path="/Form" element={<Form data={data} />} />
        <Route path="/TestComplete" element={<TestComplete show="true" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
