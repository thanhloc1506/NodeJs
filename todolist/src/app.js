const express = require("express");
const app = express();
const lib = require("./services/task-service");
const { createTask, getAllTasks, getTaskById } = require("./services/task-service");
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/tasks", (req, res) => {
  const { title, body } = req.body;
  const createdTask = { title, body };
  createTask(createdTask);
  res.send(createdTask);
});

app.get("/tasks", (req, res) => {
  res.send(getAllTasks());
});

app.get("/tasks/:taskId", (req, res) => {
  const task = getTaskById(req.params.taskId);
  res.json(task);
});

app.listen(port, () => {
  console.log(`Todolist app listening at http://localhost:${port}`);
});
