const express = require("express");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

const router = require("./routes");

mongoose.connect("mongodb://localhost/todolist-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("connected successfully");
});

const app = express();

app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Todolist app listening at http://localhost:${port}`);
});
