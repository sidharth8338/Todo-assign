const {
  registerUser,
  authenticateUser,
} = require("../controllers/auth.controller");

module.exports = function (app) {
  app.post("/api/v1/signUp", registerUser);
  app.post("/api/v1/signIn", authenticateUser);
};
