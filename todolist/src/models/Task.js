const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: String,
  body: String,
  id: String,
  completed: Boolean,
  completedAt: Date,
  createAt: Date,
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
