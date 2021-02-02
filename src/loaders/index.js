const expressLoader = require("./express");
const databaseLoader = require("./db");
const Logger = require("./logger");

module.exports = async ({expressApp}) => {
  Logger.info("loading database...");
  await databaseLoader();
  Logger.info("Loaded the database");
  await expressLoader({app: expressApp});
  Logger.info("Loaded express, we are ready")
}
