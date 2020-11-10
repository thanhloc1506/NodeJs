const express = require("express");
const app = express();
const lib = require("./services/task-service");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("./services/task-service");
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/tasks", (req, res) => {
  const { title, body } = req.body;
  const createdTask = { title, body };
  if (createdTask.title == undefined)
    res.status(400).json({message: "title is required"});
  else {
    createTask(createdTask);
    res.json(createdTask);
  }
});

app.get("/tasks", (req, res) => {
  res.json(getAllTasks());
});

app.get("/tasks/:taskId", (req, res) => {
  const task = getTaskById(req.params.taskId);
  res.json(task);
});

app.patch("/tasks/:taskId", (req, res) => {
  const { newTitle, newBody, newCompleted } = req.body;
  const update = { newTitle, newBody, newCompleted };
  console.log(update);
  const currentIdTask = req.params.taskId;
  const _updateTask = updateTask(currentIdTask, update);
  res.json(_updateTask);
});

app.delete("/tasks/:taskId", (req, res) => {
  const allTasks = deleteTask(req.params.taskId);
  res.json(allTasks);
});

app.listen(port, () => {
  console.log(`Todolist app listening at http://localhost:${port}`);
});
