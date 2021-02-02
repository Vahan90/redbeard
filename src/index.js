const config = require("./config");
const Logger = require("./loaders/logger");
const express = require("express");

require("express-async-errors");
require("./loaders/validation")();

async function startServer() {
  const app = express();

  await require("./loaders")({ expressApp: app });
  app
    .listen(config.port, () => {
      Logger.info(`
      ========================================
      Server listenting on port ${config.port}
      ========================================
      `);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
