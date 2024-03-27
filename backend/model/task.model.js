const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {type: String,enum: ["Pending", "InProgress", "Completed"],default: "Pending",},
  createrId: { type: mongoose.Types.ObjectId, },
});

const TaskModel = mongoose.model("Tasks", noteSchema);

module.exports = TaskModel;
