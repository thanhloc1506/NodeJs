const model = require("../helpers/model");
const { createModel } = require("../helpers/model");

const Task = createModel("tasks");

const createTask = (inputTask) => {
  Task.createEntity(inputTask);
};

function getAllTasks() {
  return Task.getAllEntities();
}

function getTaskById(inputId) {
  const allTasks = Task.getAllEntities();
  for (const i in allTasks) {
    if (allTasks[i].id == inputId) {
      return allTasks[i];
    }
  }
  return null;
}

function updateTask(currentIdTask, update) {
  const currentTask = getTaskById(currentIdTask);
  return Task.updateEntity(currentTask, update);
}

function deleteTask(currentID) {
  return Task.deleteEntity(currentID);
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};