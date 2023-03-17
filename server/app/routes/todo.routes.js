const {
  getTodoController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
} = require("../controllers/todo.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.post("/api/v1/getTodoList", isAuthenticated, getTodoController);
  app.post("/api/v1/createTodo", isAuthenticated, createTodoController);
  app.patch("/api/v1/updateTodo", isAuthenticated, updateTodoController);
  app.delete("/api/v1/deleteTodo", isAuthenticated, deleteTodoController);
};
