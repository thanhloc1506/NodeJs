const { Router } = require("express");
const { requireUser } = require("../middleware/auth");
const tasksRouter = Router({ mergeParams: true });
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../services/task-service");
tasksRouter
  .post("/", requireUser, (req, res) => {
    const { title, body } = req.body;

    const userID = req.user._id;
    const createdTask = { title, body, userID };
    createTask(createdTask)
      .then((task) => res.json(task))
      .catch((error) => res.send(error));
  })

  .get("/", requireUser, (req, res) => {
    getAllTasks().then((tasks) => res.json(tasks));
  })

  .get("/:taskId", requireUser, (req, res) => {
    getTaskById(req.params.taskId)
      .then((task) => res.json(task))
      .catch((error) => res.json(error));
  })

  .patch("/:taskId", requireUser, (req, res) => {
    const { title, body, completed } = req.body;
    const update = { title, body, completed };
    console.log(update);
    const currentIdTask = req.params.taskId;
    updateTask(currentIdTask, update)
      .then((task) => res.json(task))
      .catch((error) => res.json(error));
  })

  .delete("/:taskId", requireUser, (req, res) => {
    deleteTask(req.params.taskId)
      .then((task) => res.json(task))
      .catch((error) => res.json(error));
  });

module.exports = tasksRouter;
