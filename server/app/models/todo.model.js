const mongoose = require("mongoose");

const TodoModel = mongoose.model(
  "todoList",
  new mongoose.Schema({
    author_id: mongoose.Types.ObjectId,
    todo: String,
    isDone: Boolean,
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  })
);

module.exports = TodoModel;
