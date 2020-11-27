const { findById } = require("../models/Task.js");
const Task = require("../models/Task.js");

const createTask = (inputTask) => {
  return new Promise((resolve, reject) => {
    Task.create(inputTask)
      .then((task) => {
        if (task) resolve(task);
      })
      .catch((error) => reject(error));
  });
};

const getAllTasks = () => {
  return new Promise((resolve, reject) => {
    Task.find().then((tasks) => {
      resolve(tasks);
    });
  });
};

function getTaskById(inputId) {
  return new Promise((resolve, reject) => {
    getAllTasks().then((allTasks) => {
      for (const i in allTasks) {
        if (allTasks[i]._id.toString() == inputId) {
          resolve(allTasks[i]);
        }
      }
      reject(null);
    });
  });
}

function updateTask(currentIdTask, update) {
  return new Promise((resolve, reject) => {
    Task.findById(currentIdTask)
      .then((foundTask) => {
        if (foundTask) {
          const completedAt = update.completed == true ? new Date() : null;
          const title = update.title ? update.title : foundTask.title;
          const body = update.body ? update.body : foundTask.body;
          const completed = update.completed;
          Task.update(
            { _id: currentIdTask },
            { title, body, completed, completedAt }
          ).then((updateTask) => {
            updateTask = Task.findById(currentIdTask);
            resolve(getTaskById(currentIdTask));
          });
        } else {
          reject("Task input is not existed");
        }
      })
      .catch((error) => reject(error));
  });
}

function deleteTask(currentID) {
  return new Promise((resolve, reject) => {
    Task.findById(currentID)
      .then((foundTask) => {
        if (!foundTask) 
          reject("Can't delete task or task is not existed");
        Task.remove(foundTask).then(() => {
          resolve("Delete done");
        });
      })
      .catch((error) => reject(error));
  });
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
