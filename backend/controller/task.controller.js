const express = require("express");
const TaskeModel = require("../model/task.model");

const taskController = express.Router();

taskController.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;
    
    let query = {};

    // Filtering by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    const totalItems = await TaskeModel.countDocuments(query);
    const totalPages = Math.ceil(totalItems / pageSize);

    const task = await TaskeModel.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      task,
      page,
      totalPages,
      totalItems,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = taskController;