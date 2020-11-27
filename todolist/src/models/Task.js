const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: String,
  id: String,
  completed: Boolean,
  completedAt: Date,
  createAt: Date,
  userID: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
