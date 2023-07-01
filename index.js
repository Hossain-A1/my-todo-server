const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const taskRoute = require("./routes/task");

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.MONGO_URI;
// middleware
app.use(cors({ credentials: true }));
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "hello todo app" });
});
app.use("/api/text/todo", taskRoute);

mongoose.connect(uri, { useUnifiedTopology: true }).then(() => {
  app.listen(port, () => {
    console.log(`App listen and mongoDB connect on port ${port}`);
  });
});
