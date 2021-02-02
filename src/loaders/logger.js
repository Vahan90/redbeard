const winston = require("winston");
const config = require("../config");

const transports = [];

transports.push(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.cli(),
      winston.format.splat()
    ),
  }),
  new winston.transports.File({ filename: "app.log", maxsize: 100000000 })
);

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports,
  exceptionHandlers: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "uncaught_exceptions.log",
      maxSize: 100000000,
    }),
  ],
});

module.exports = LoggerInstance;
