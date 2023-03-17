require("dotenv").config();
const pg = require("pg");
// const path = require("path");

// DATABASE CONFIGURATION
const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

// CREATING POOL FOR QUERY
const pool = new pg.Pool(config);

// TESTING DATABASE CONNECTION
pool
  .connect()
  .then((r) => {
    console.log("Database connected on port " + process.env.DB_PORT);
  })
  .catch((e) => {
    console.log(e);
  });

// EXPORTING POOL AS DEFAULT
module.exports = pool;
