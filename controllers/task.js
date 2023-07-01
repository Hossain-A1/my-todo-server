const Task = require("../models/task");
const mongoose = require("mongoose");

// get all
const getAllTask = async (req, res) => {
  const tasks = await Task.find({}).sort({createdAt:-1});
  if (!tasks) {
    throw Error("Tasks not found.");
  }
  res.status(200).json(tasks);
};

// post a task
const getTask = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      throw Error("Fill in this feild.");
    }
    // create a task
    const userTask = await Task.create({ ...req.body });
    res.status(200).json(userTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const task = await Task.findOneAndDelete({
    _id: id,
  });
  if (!task) {
    return res.status(400).json({ error: "No task found." });
  }
  res.status(200).json(task);
};

// update task
const updateTask = async (req, res) => {
  try {
  const { id } = req.params;
  const { text } = req.body;
  if(!text){
    throw Error("No text.")
  }
    
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid id" });
      }
    const task = await Task.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!task) {
      throw Error("No task update.");
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = {
  getTask,
  getAllTask,
  deleteTask,
  updateTask
};
