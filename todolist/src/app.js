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
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolist-app', {useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected successfully")
});
app.use(express.json());

app.post("/tasks", (req, res) => {
  const { title, body } = req.body;
  const createdTask = { title, body };
  if (createdTask.title == undefined)
    res.status(400).json({message: "title is required"});
  else {
    createTask(createdTask, (createdTask) => {
      res.json(createdTask);
    });
    
  }
});

app.get("/tasks", (req, res) => {
  getAllTasks((err, tasks) => {
      res.json(tasks);
  });
});

app.get("/tasks/:taskId", (req, res) => {
  const task = getTaskById(req.params.taskId);
  res.json(task);
});

app.patch("/tasks/:taskId", (req, res) => {
  const { title, body, completed } = req.body;
  const update = { title, body, completed };
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
