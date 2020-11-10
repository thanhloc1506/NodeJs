const fs = require("fs");
const path = require("path");

const DB_DIR = path.resolve(__dirname, "../../db");

function createModel(modelName) {
  const dbFile = path.resolve(DB_DIR, modelName) + ".json";
  function ensureDbFile() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR);
    }
    if (!fs.existsSync(dbFile)) {
      fs.writeFileSync(dbFile, "");
    }
  }

  function saveEntities(entities) {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(dbFile, JSON.stringify(entities));
    return entities;
  }

  function getAllEntities() {
    try {
      return JSON.parse(fs.readFileSync(dbFile));
    } catch (error) {
      return [];
    }
  }

  function createEntity(entityInput) {
    entityInput.id = Date.now().toString();
    entityInput.createAt = new Date();
    entityInput.completed = false;
    entityInput.completedAt = null;
    const dbEntity = getAllEntities();
    const newdbEntity = [...dbEntity, entityInput];
    saveEntities(newdbEntity);
    return newdbEntity;
  }

  function updateEntity(currentTask, update) {
    if (update.newTitle != undefined) currentTask.title = update.newTitle;
    if (update.newBody != undefined) currentTask.body = update.newBody;
    if (currentTask.completed == false && update.newCompleted == true)
      currentTask.completedAt = new Date();
    if (currentTask.completed == true && update.newCompleted == false)
      currentTask.completedAt = null;
    if (update.newCompleted != undefined)
      currentTask.completed = update.newCompleted;
    const allEntities = getAllEntities();
    for (const i in allEntities) {
      if (allEntities[i].id == currentTask.id) {
        allEntities[i] = currentTask;
        saveEntities(allEntities);
      }
    }
    return currentTask;
  }

  function deleteEntity(idEntity) {
    const allEntities = getAllEntities();
    for (const i in allEntities) {
      if (allEntities[i].id == idEntity) {
        allEntities.splice(i, 1);
      }
    }
    saveEntities(allEntities);
    return allEntities;
  }

  return {
    ensureDbFile,
    saveEntities,
    getAllEntities,
    createEntity,
    updateEntity,
    deleteEntity
  };
}

module.exports = { createModel };
