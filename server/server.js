import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { Form } from "./model/form.model.js";
const app = express();
const PORT = process.env.PORT;
const mongoDbStr = process.env.mongoDBCloudConnect;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(mongoDbStr)
  .then((response) => console.log("MongoDB Conn Successful"))
  .catch((err) => console.log("Error during MongoDB Connection: ", err));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to getsetgo backend");
});
app.get("/forms", (req, res) => {
  Form.find({ completed: false }, "_id name")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.error("Error:", err);
    });
});
app.get("/form/:id", (req, res) => {
  const id = req.params["id"];
  if (id === undefined) {
    res.status(400).json("Kindly send a form id");
    return;
  }
  Form.find({ _id: id })
    .then((response) => {
      if (response) {
        res.status(201).json(response);
        console.log("fetch successful for form id: ", id);
        return;
      }
      res.status(400).json(response);
      console.log("No such form id found");
    })
    .catch((err) => res.status(500).json(err));
});

app.post("/", (req, res) => {
  Form.create(req.body)
    .then((response) => {
      res.status(200).json("Form Created Successfully");
      console.log("Form Created Successfully");
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
app.listen(PORT, () => console.log("Server started at port no:", PORT));
