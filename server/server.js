require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || "4000";
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./app/routes/auth.routes");
var compression = require("compression");
var db = require("./app/config/db");
const todoRoutes = require("./app/routes/todo.routes");

// MIDDLEWARE
app.use(logger("dev"));
app.use(helmet());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(compression());
app.use(cors());

// SECURITY
app.disable("x-powered-by");

// APP ROUTES
app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Hurray! Backend is up and running....",
  });
});

authRoutes(app);
todoRoutes(app);

// START SERVER
app.set("port", port);
server.listen(port, () => {
  console.log("Server Started on port:", port);
});
