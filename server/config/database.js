require("dotenv").config(); //have access to environment variable
const mysql = require("mysql2-async").default; //mysql

/**
 * CREATE DATABASE
 */
const db = new mysql({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  timezone: "Z",
  skiptzfix: true
});

if (db) {
  console.log("database connection successful");
} else {
  console.log("database connection not successful");
}

module.exports = db;
