const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const contactRouter = require("./router/contact");
const userRouter = require("./router/user");

const { DB_HOST } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/contacts", contactRouter);
app.use("/users", userRouter);

mongoose.set("strictQuery", false);
mongoose.connect(DB_HOST, () => {
  console.log("Database is connecting");
});

app.listen(4000, () => {
  console.log("Server is running");
});
