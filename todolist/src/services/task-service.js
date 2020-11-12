const model = require("../helpers/model");
const { createModel } = require("../helpers/model");

const Task = require("../models/Task.js");

const createTask = (inputTask, callback) => {
  Task.create(inputTask).then((task) => {
    console.log(callback)
    callback(task);
  });
};

function getAllTasks(callback) {
  Task.find().then((tasks) => {
     callback(null, tasks);
  });
}

function getTaskById(inputId) {
  const allTasks = TaskJSONDB.getAllEntities();
  for (const i in allTasks) {
    if (allTasks[i].id == inputId) {
      return allTasks[i];
    }
  }
  return null;
}

function updateTask(currentIdTask, update) {
  const currentTask = getTaskById(currentIdTask);
  return TaskJSONDB.updateEntity(currentTask, update);
}

function deleteTask(currentID) {
  return TaskJSONDB.deleteEntity(currentID);
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
