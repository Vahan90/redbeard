// const dotenv = require("dotenv");

// Let's set NODE_ENV to development by default.
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// const envFound = dotenv.config({ path: "../.env" });
// const envFound = dotenv.config();

// if (envFound.error) {
//   console.error(envFound.error);
//   throw new Error("Couldn't find env file!");
// }

module.exports = {
  /**
   * Our port - defaults at 3000
   */
  port: parseInt(process.env.PORT) || 3000,

  /**
   * Log object - log level
   */
  logs: {
    level: "silly",
  },

  /**
   * Our mongodb url
   */
  databaseURL: process.env.DB_HOST,

  /**
   * JWT Private Key
   */
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY || "astrongkeyoverhere",

  /**
   * Prefix: The prefix of our api
   */
  prefix: process.env.ROUTES_PREFIX || "/api",

  /**
   * Urls
   */
  urls: {
  },

  /**
   * AWS
   */
  aws: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: "",
    pathPrefix: process.env.AWS_BUCKET_PATH_PREFIX,
    competitionFunctionName: process.env.COMPETITION_FUNCTION_NAME,
  },
}
