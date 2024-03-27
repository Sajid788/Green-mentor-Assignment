const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {type: String,enum: ["Pending", "InProgress", "Completed"],default: "Pending",},
  createrId: { type: mongoose.Types.ObjectId, required: true },
});

const TaskeModel = mongoose.model("Notes", noteSchema);

module.exports = TaskeModel;
