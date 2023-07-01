const express = require("express");
const {
  getTask,
  getAllTask,
  deleteTask,
  updateTask,
} = require("../controllers/task");

const router = express.Router();

router.post("/", getTask);
router.get("/", getAllTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);

module.exports = router;
