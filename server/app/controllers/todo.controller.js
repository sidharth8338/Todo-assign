const TodoModel = require("../models/todo.model");
const { errorResponse, successResponse } = require("../utils/response.utils");

exports.getTodoController = async (req, res) => {
  try {
    const glossaryData = await TodoModel.find({
      author_id: req.body.id,
    });
    res.status(200).send(successResponse(glossaryData));
  } catch (e) {
    res.status(400).send(errorResponse(e));
  }
};

exports.createTodoController = async (req, res) => {
  try {
    const glossaryData = await TodoModel.create({
      ...req.body,
      author_id: req.body.id,
    });
    res.status(200).send(successResponse(glossaryData));
  } catch (e) {
    console.log(e);
    res.status(400).send(errorResponse(e));
  }
};

exports.updateTodoController = async (req, res) => {
  try {
    const glossaryData = await TodoModel.findByIdAndUpdate(
      req.body.todo_id,
      req.body,
      { new: true }
    );
    res.status(200).send(successResponse(glossaryData));
  } catch (e) {
    res.status(400).send(errorResponse(e));
  }
};

exports.deleteTodoController = async (req, res) => {
  try {
    const glossaryData = await TodoModel.findByIdAndDelete(req.body.todo_id, {
      new: true,
    });
    res.status(200).send(successResponse(glossaryData));
  } catch (e) {
    console.log(e);
    res.status(400).send(errorResponse(e));
  }
};
