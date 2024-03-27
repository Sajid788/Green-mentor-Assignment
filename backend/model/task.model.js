const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [2, 'Tittle must be at least 2 characters'],
    maxlength: [100, 'Title cannot axceed 100 character'],
  },
  description: { type: String, required: true,
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [800, 'Description cannot axceed 800 character'],
   },
  status: {
    type: String,
    enum: ["Pending", "InProgress", "Completed"],
    default: "Pending",
  },
  createrId: { type: mongoose.Types.ObjectId },
});

const TaskModel = mongoose.model("Tasks", noteSchema);

module.exports = TaskModel;
