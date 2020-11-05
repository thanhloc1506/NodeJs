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
    entityInput.id = Date.now();
    entityInput.createAt = new Date();
    const dbEntity = getAllEntities();
    const newdbEntity = [...dbEntity, entityInput]
    saveEntities(newdbEntity);
    return newdbEntity;
  }

  return { ensureDbFile, saveEntities, getAllEntities, createEntity };
}

module.exports = { createModel };
