const express = require("express");
const TaskModel = require("../model/task.model");

const taskController = express.Router();

// Get Methode
taskController.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;

    let query = {};

    // Filtering by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    const totalItems = await TaskModel.countDocuments(query);
    const totalPages = Math.ceil(totalItems / pageSize);

    const task = await TaskModel.find(query)
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

// Post Method
taskController.post("/create", async (req, res) => {
  const userId = req.userId;
  const { title, description, status } = req.body;
  if (!title || !description || !status) {
    return res.send({ msg: "Please fill all the details" });
  }
  try {
    const Task = await TaskModel.create({
      title: title,
      description: description,
      status: status,
      createrId: userId,
    });
    res.status(201).json({ message: "Task added successfully" });
    console.log(Task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Patch Methode

taskController.patch("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const createrId = req.userId;

  try {
    const user = await TaskModel.findByIdAndUpdate(
      { _id: id, createrId },
      { ...req.body }
    );
    if (user) {
      res.status(202).json({ message: "Task Updated Successfully" });
    } else {
      return res.status(404).json({ message: "Task data not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong!" });
  }
});

// Delete methode
taskController.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const createrId = req.userId;
  try {
    const user = await TaskModel.findByIdAndDelete({ _id: id, createrId });
    if (user) {
      res.status(202).json({ message: "Task deleted Successfully" });
    } else {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong!" });
  }
});

module.exports = taskController;
