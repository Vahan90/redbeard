const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const Logger = require("./logger");
const config = require("../config");
const routes = require("../api");
const bodyParser = require("body-parser");

module.exports = ({ app }) => {
  /**
   * Health check endpoint
   */
  app.use((req, res, done) => {
    let ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
    Logger.info(req.method + " " + req.originalUrl + " | Ip Address: " + ip);
    done();
  });

  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  // For nginx to show the ip
  app.enable("trust proxy");

  app.use(helmet());
  app.use(cors());

  app.get("/robots.txt", (req, res, next) => {
    res.type("text/plain");
    res.send("User-agent: *\nDisallow: /");
  });

  app.use("/static", express.static("static"));

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(config.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
