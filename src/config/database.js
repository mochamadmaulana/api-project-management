require("dotenv").config();

module.exports = {
  "development": {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT || "mysql",
    "timezone": process.env.DB_TIMEZONE,
  },
  "test": {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT || "mysql",
    "timezone": process.env.DB_TIMEZONE,
  },
  "production": {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT || "mysql",
    "timezone": process.env.DB_TIMEZONE,
  }
}
